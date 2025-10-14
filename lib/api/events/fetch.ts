// src/lib/api/events.ts
import { unstable_cache } from "next/cache";
import { API_DOMAIN } from "../config";

// ВАЖНО: типы уже объявлены у тебя. Здесь просто импортируем.
import type {
  EventManagement,
  SomeWorkItem,
  OwnedEventSettings,
  OwnedEvent,
  // ниже — если ты хранишь их в другом месте, поправь путь импорта
  OwnedEventItemData,
  OwnedEventTeaser,
} from "./types";

/* ----------------------------- helpers ----------------------------- */

async function fetchJSON<T>(
  url: string,
  revalidate = 60,
  tags: string[] = []
): Promise<T> {
  const res = await fetch(url, { next: { revalidate, tags } } as any);
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

const TAG_EVENT_PAGE = "event-page";
const TAG_OWNED_EVENTS = "owned-events";

/* ----------------------------- ENDPOINTS --------------------------- */

const EVENT_PAGE_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/eventmanagemet`;
const EVENT_WORKS_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/eventmanagemet/works`;

const OWNED_EVENTS_RAW_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/home-page-settings/owned-events`;
const OWNED_SETTINGS_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/ownedeventssettings`;
const ALL_OWNED_EVENTS_URL = `${API_DOMAIN}/wp-json/bbr/v1/allevents`;

const OWNED_EVENT_ITEM_URL = `${API_DOMAIN}/wp-json/bbr/v1/event-items`;
const OWNED_EVENT_TEASERS = `${API_DOMAIN}/wp-json/bbr/v1/event-teasers`;

/* ------------------------- EVENT MANAGEMENT ------------------------ */

// options
const _getEventOptions = unstable_cache(
  async () => fetchJSON<any>(EVENT_PAGE_URL, 2, [TAG_EVENT_PAGE]),
  ["event-page:options"],
  { revalidate: 60, tags: [TAG_EVENT_PAGE] }
);

// works
const _getEventWorks = unstable_cache(
  async () => fetchJSON<SomeWorkItem[]>(EVENT_WORKS_URL, 2, [TAG_EVENT_PAGE]),
  ["event-page:works"],
  { revalidate: 60, tags: [TAG_EVENT_PAGE] }
);

export async function fetchEventManagementContent(): Promise<EventManagement> {
  const [opts, works] = await Promise.all([
    _getEventOptions(),
    _getEventWorks(),
  ]);
  const acf = opts?.acf ?? {};

  return {
    hero: {
      title: acf.hero_event?.title_event ?? "",
      description: acf.hero_event?.description_event ?? "",
    },

    management: {
      sub_title: acf.management?.sub_title ?? "",
      title: acf.management?.title ?? "",
      description: acf.management?.description ?? "",
      media_large: {
        url: acf.management?.media_large?.image?.url ?? "",
        alt: acf.management?.media_large?.image?.alt ?? "",
      },
      media_small: {
        url: acf.management?.media_small?.image?.url ?? "",
        alt: acf.management?.media_small?.image?.alt ?? "",
      },
      content: Array.isArray(acf.management?.content)
        ? acf.management.content.map((item: any) => ({
            title: item?.title ?? "",
            description: item?.description ?? "",
            media: item?.media?.image
              ? {
                  url: item.media.image?.url ?? "",
                  alt: item.media.image?.alt ?? "",
                }
              : undefined,
          }))
        : [],
    },

    carousel: {
      title: acf.carousel?.title ?? "",
      gallery: Array.isArray(acf.carousel?.gallery)
        ? acf.carousel.gallery
            .map((img: any) => (typeof img === "string" ? img : img?.url ?? ""))
            .filter(Boolean)
        : [],
    },

    services: {
      sub_title: acf.services_event?.sub_title ?? "",
      title: acf.services_event?.title ?? "",
      content: Array.isArray(acf.services_event?.content)
        ? acf.services_event.content.map((item: any) => ({
            title: item?.title ?? "",
            description: item?.description ?? "",
            media: {
              url: item?.media?.image?.url ?? "",
              alt: item?.media?.image?.alt ?? "",
            },
          }))
        : [],
    },

    some_of_our_work: {
      title: acf.some_of_our_work?.title ?? "",
      works: Array.isArray(works) ? works : [],
    },

    seo: {
      meta_title: acf.seo_event_management?.title ?? "",
      meta_description: acf.seo_event_management?.meta_description ?? "",
      social_image: {
        url: acf.seo_event_management?.seo_image?.url ?? "",
        alt: acf.seo_event_management?.seo_image?.alt ?? "",
      },
    },
  };
}

/* ---------------------------- OWNED EVENTS ------------------------- */

// RAW данные для главной (ids + тексты)
export const fetchOwnedEventsRaw = unstable_cache(
  async () => fetchJSON<any>(OWNED_EVENTS_RAW_URL, 2, [TAG_OWNED_EVENTS]),
  ["owned-events:raw"],
  { revalidate: 60, tags: [TAG_OWNED_EVENTS] }
);

// настройки страницы owned-events
export const fetchOwnedEventSettings = unstable_cache(
  async (): Promise<OwnedEventSettings> => {
    const json = await fetchJSON<any>(OWNED_SETTINGS_URL, 2, [
      TAG_OWNED_EVENTS,
    ]);
    const acf = json?.acf ?? {};
    return {
      hero: {
        title: acf.hero_oe?.title_oe ?? "",
        description: acf.hero_oe?.description_oe ?? "",
      },
      // важно: берём seo_ownedev
      seo: {
        title: acf.seo_ownedev?.title ?? "",
        meta_description: acf.seo_ownedev?.meta_description ?? "",
        image: {
          url: acf.seo_ownedev?.seo_image ?? "",
          alt: "",
        },
      },
    };
  },
  ["owned-events:settings"],
  { revalidate: 60, tags: [TAG_OWNED_EVENTS] }
);

// список всех owned-events (id/slug/title/logo/hero_image)
export const fetchAllOwnedEvents = unstable_cache(
  async (): Promise<OwnedEvent[]> => {
    const data = await fetchJSON<
      Array<{
        id: number;
        slug: string;
        title: string;
        logo: string;
        hero_image: string;
      }>
    >(ALL_OWNED_EVENTS_URL, 2, [TAG_OWNED_EVENTS]);

    return (Array.isArray(data) ? data : []).map((evt) => ({
      id: evt.id,
      slug: evt.slug,
      title: evt.title,
      logo: evt.logo,
      hero_image: evt.hero_image,
    }));
  },
  ["owned-events:list"],
  { revalidate: 60, tags: [TAG_OWNED_EVENTS] }
);

/* ----------------------- OWNED EVENT: BY SLUG ---------------------- */

export async function fetchOwnedEventItem(
  slug: string
): Promise<OwnedEventItemData> {
  const res = await fetch(
    `${OWNED_EVENT_ITEM_URL}/${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`Owned event ${slug} → ${res.status}`);

  const js = await res.json();
  const acf = js?.acf ?? {};
  const media = acf?.media ?? {};

  return {
    id: js.id,
    slug: js.slug,
    title: js.title,

    media: {
      logo: media.logo?.url ?? "",
      hero_image: media.hero_image?.url ?? "",
      video: acf.video?.url ?? "",
    },

    event_information: {
      title: acf.event_information?.title ?? "",
      subtitle:
        acf.event_information?.subtitle ??
        acf.event_information?.sub_title ??
        "",
      sub_title:
        acf.event_information?.sub_title ??
        acf.event_information?.subtitle ??
        "",
      text: acf.event_information?.text ?? "",
      info_block: Array.isArray(acf.event_information?.info_block)
        ? acf.event_information.info_block
        : [],
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

    seo_owned_event: {
      title: acf.seo_owned_event?.title ?? "",
      meta_description: acf.seo_owned_event?.meta_description ?? "",
      seo_image: {
        url:
          typeof acf.seo_owned_event?.seo_image === "string"
            ? acf.seo_owned_event.seo_image
            : acf.seo_owned_event?.seo_image?.url ?? "",
        alt: acf.seo_owned_event?.seo_image?.alt ?? "",
      },
    },

    more_events_ids: Array.isArray(js?.more_events)
      ? js.more_events
          .map((p: any): number => Number(p?.ID))
          .filter((n: number) => Number.isFinite(n))
      : [],
  };
}

/* ----------------------------- TEASERS ----------------------------- */

export async function fetchOwnedEventTeasers(): Promise<OwnedEventTeaser[]> {
  const res = await fetch(OWNED_EVENT_TEASERS, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch event teasers: ${res.status}`);

  const data = await res.json();
  return (data as any[]).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    media: {
      hero_image: item.image,
    },
    event_information: {
      text: item.description ?? "",
    },
  }));
}
