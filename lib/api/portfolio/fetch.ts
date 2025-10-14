// lib/api/portfolio.ts
import { API_DOMAIN } from "./../config";
import { unstable_cache } from "next/cache";
import type {
  PortfolioItemRaw,
  PortfolioSettings,
  PortfolioTeaser,
  SimpleWork,
} from "./types";
const REVALIDATE = Number(
  process.env.NEXT_PUBLIC_REVALIDATE ?? process.env.REVALIDATE ?? 60
);

/* ----------------------------- helpers ----------------------------- */

type NextFetchInit = RequestInit & {
  next?: { revalidate?: number; tags?: string[] };
};

const TAG_ITEMS = "portfolio-items";
const TAG_SETTINGS = "portfolio-settings";
const ITEMS_URL = `${API_DOMAIN}/wp-json/bbr/v1/portfolio-items`;
const SETTINGS_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/porfoliosettings`;

function normalizeIds(ids: number[]): number[] {
  return Array.from(
    new Set(ids.map(Number).filter((n) => Number.isFinite(n) && n > 0))
  );
}

async function fetchJSON<T>(
  url: string,
  revalidate = REVALIDATE,
  tags: string[] = []
): Promise<T> {
  const init: NextFetchInit = { next: { revalidate, tags } };
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

/* ----------------------------- SETTINGS ---------------------------- */

const _fetchPortfolioSettings = unstable_cache(
  async (): Promise<PortfolioSettings> => {
    const json = await fetchJSON<any>(SETTINGS_URL, REVALIDATE, [TAG_SETTINGS]);
    const acf = json?.acf ?? {};
    return {
      hero_port: {
        title_port: acf.hero_port?.title_port ?? "",
        description_port: acf.hero_port?.description_port ?? "",
      },
      more_events: {
        title: acf.more_events?.title ?? "",
        link: acf.more_events?.link ?? "",
      },
      seo: {
        title: acf.seo_portfolio?.title ?? "",
        meta_description: acf.seo_portfolio?.meta_description ?? "",
        image: acf.seo_portfolio?.seo_image ?? "",
      },
    };
  },
  ["portfolio-settings"],
  { revalidate: REVALIDATE, tags: [TAG_SETTINGS] }
);

export async function fetchPortfolioContent(): Promise<PortfolioSettings> {
  return _fetchPortfolioSettings();
}

/* ------------------------------ LISTS ------------------------------ */

// все raw
export async function fetchAllPortfolioItems(): Promise<PortfolioItemRaw[]> {
  const data = await fetchJSON<unknown>(ITEMS_URL, 2, [TAG_ITEMS]);
  if (!Array.isArray(data)) return [];
  return data as PortfolioItemRaw[];
}

// упрощённый список (для гридов)
export async function fetchSimpleWorks(): Promise<SimpleWork[]> {
  const raws = await fetchAllPortfolioItems();
  return (raws as any[]).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    work_type: item.acf?.work_type ?? "",
    tag: item.acf?.tag ?? "",
    media: { hero_image: item.acf?.media?.hero_image?.url ?? "" },
  }));
}

// кэшируемый упрощённый список
export const fetchPortfolioItems = unstable_cache(
  async (): Promise<SimpleWork[]> => {
    const data = await fetchJSON<unknown>(ITEMS_URL, 2, [TAG_ITEMS]);
    const arr = Array.isArray(data) ? (data as any[]) : [];
    return arr.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      work_type: item.acf?.work_type ?? "",
      tag: item.acf?.tag ?? "",
      media: { hero_image: item.acf?.media?.hero_image?.url ?? "" },
    }));
  },
  ["portfolio-items:list"],
  { revalidate: REVALIDATE, tags: [TAG_ITEMS] }
);

// по списку id (с сохранением порядка)
export async function fetchPortfolioItemsByIds(
  ids: number[],
  revalidate = REVALIDATE
): Promise<PortfolioItemRaw[]> {
  const unique = normalizeIds(ids);
  if (!unique.length) return [];

  const url = `${ITEMS_URL}?include=${unique.join(",")}`;
  const data = await fetchJSON<unknown>(url, revalidate, [TAG_ITEMS]);
  const arr = Array.isArray(data) ? (data as PortfolioItemRaw[]) : [];

  const byId = new Map(arr.map((it) => [it.id, it]));
  return unique.map((id) => byId.get(id)).filter(Boolean) as PortfolioItemRaw[];
}

/* ----------------------------- BY SLUG ----------------------------- */

export interface PortfolioItemData {
  id: number;
  slug: string;
  title: string;
  media: { hero_image: string; video: string };
  event_information: {
    sub_title: string;
    title: string;
    text: string;
    info_block: { items: Array<{ title: string; value: string }> };
  };
  gallery: string[];
  stats_block: {
    sub_title: string;
    title: string;
    indicators: string[];
    stats: Array<{ label: string; value: string }>;
  };
  sponsors: { sub_title: string; items: string[] };
  cta: Array<{ label: string; link: string }>;
  seo_work: {
    title: string;
    meta_description: string;
    seo_image: { url: string; alt: string };
  };
}

// маппер ACF → PortfolioItemData
function mapAcfToPortfolio(js: any): PortfolioItemData {
  const acf = js?.acf ?? {};
  return {
    id: js?.id ?? 0,
    slug: js?.slug ?? "",
    title: js?.title ?? "",
    media: {
      hero_image: acf.media?.hero_image?.url ?? "",
      video: acf.video?.url ?? "",
    },
    event_information: {
      sub_title: acf.event_information?.sub_title,
      title: acf.event_information?.title ?? "",
      text: acf.event_information?.text ?? "",
      info_block: {
        items: Array.isArray(acf.event_information?.info_block)
          ? acf.event_information.info_block
          : [],
      },
    },
    gallery: Array.isArray(acf.gallery)
      ? acf.gallery.map((g: any) => (typeof g === "string" ? g : g?.url ?? ""))
      : [],
    stats_block: {
      sub_title: acf.stats_block?.sub_title ?? "",
      title: acf.stats_block?.title ?? "",
      indicators: Array.isArray(acf.stats_block?.indicators)
        ? acf.stats_block.indicators.map(
            (i: any) => i?.indicator_text ?? i ?? ""
          )
        : [],
      stats: Array.isArray(acf.stats_block?.stats) ? acf.stats_block.stats : [],
    },
    sponsors: {
      sub_title: acf.sponsors?.sub_title ?? "",
      items: Array.isArray(acf.sponsors?.items)
        ? acf.sponsors.items.map((l: any) => l?.url ?? "")
        : [],
    },
    cta: Array.isArray(acf.cta)
      ? acf.cta.map((btn: any) => ({
          label: btn?.label ?? "",
          link: btn?.link?.url ?? "",
        }))
      : [],
    seo_work: {
      title: acf.seo_work?.title ?? "",
      meta_description: acf.seo_work?.meta_description ?? "",
      seo_image: {
        url:
          typeof acf.seo_work?.seo_image === "string"
            ? acf.seo_work.seo_image
            : acf.seo_work?.seo_image?.url ?? "",
        alt: acf.seo_work?.seo_image?.alt ?? "",
      },
    },
  };
}

// кэшируемая деталка по slug
function cachedPortfolioItem(slug: string) {
  return unstable_cache(
    async () => {
      const url = `${ITEMS_URL}/${encodeURIComponent(slug)}`;
      const init: NextFetchInit = {
        next: {
          revalidate: REVALIDATE,
          tags: [TAG_ITEMS, `portfolio-item:${slug}`],
        },
      };
      const res = await fetch(url, init);
      if (!res.ok) throw new Error(`Portfolio item ${slug} → ${res.status}`);
      const js = await res.json();
      return mapAcfToPortfolio(js);
    },
    // ключ кэша включает slug
    ["portfolio-item", slug],
    { revalidate: 60, tags: ["portfolio-items", `portfolio-item:${slug}`] }
  )();
}

export async function fetchPortfolioItem(
  slug: string,
  opts?: { noStore?: boolean }
) {
  if (opts?.noStore) {
    const url = `${ITEMS_URL}/${encodeURIComponent(slug)}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Portfolio item ${slug} → ${res.status}`);
    return mapAcfToPortfolio(await res.json());
  }
  return cachedPortfolioItem(slug);
}

// эндпоинт с тизерами
const TEASERS_URL = `${API_DOMAIN}/wp-json/bbr/v1/portfolio-teasers`;
const TAG_TEASERS = "portfolio-teasers";

export const fetchPortfolioTeasers = unstable_cache(
  async (): Promise<PortfolioTeaser[]> => {
    const init: NextFetchInit = {
      next: { revalidate: REVALIDATE, tags: [TAG_TEASERS] },
    };
    const res = await fetch(TEASERS_URL, init);
    if (!res.ok) throw new Error(`Failed to fetch teasers: ${res.status}`);
    const data = (await res.json()) as any[];
    return data.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      work_type: item.work_type ?? "",
      tag: item.tag ?? "",
      media: { hero_image: item.image ?? "" },
      event_information: { text: item.description ?? "" },
    }));
  },
  ["portfolio-teasers:list"],
  { revalidate: REVALIDATE, tags: [TAG_TEASERS] }
);

/** Вернёт up to `limit` тизеров, исключая элемент с `excludeSlug` (если задан) */
export async function fetchMoreEventsTeasers(
  excludeSlug?: string,
  limit = 6
): Promise<PortfolioTeaser[]> {
  const all = await fetchPortfolioTeasers();
  let list = all;
  if (excludeSlug) list = list.filter((t) => t.slug !== excludeSlug);
  if (limit > 0) list = list.slice(0, limit);
  return list;
}
