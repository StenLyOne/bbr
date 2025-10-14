// src/lib/api/home-view.ts
import { unstable_cache } from "next/cache";
import type {
  EventItem,
  HeroData,
  HomeContent,
  LatestData,
  MissionData,
  MissionSecondaryData,
  OwnedEventsMetaRaw,
  PartnersData,
} from "./types";
import type { OwnedEventRaw, HomeViewModel } from "./types";

import { fetchOwnedEventsRaw } from "../events";
import { API_DOMAIN } from "../config";
import { SeoSettings } from "../seo";

// маленький чистый хелпер (pure function)
function buildOwnedEvents(
  ids: number[],
  raw: OwnedEventRaw[],
  title: string,
  sub_title: string
): HomeViewModel["ownedEvents"] {
  const filtered = raw.filter((o) => ids.includes(o.id));
  if (!filtered.length) return null;

  return {
    sub_title,
    title,
    events: filtered.map((o) => ({
      name: o.title,
      link: `/our-owned-events/${o.slug}`,
      media: {
        image_src: o.acf.media.hero_image?.url ?? "",
        logo_src: o.acf.media.logo?.url ?? "",
        alt: o.acf.media.alt ?? o.title,
      },
      stats: (o.acf.stats_block?.stats ?? [])
        .slice(0, 3)
        .map((s) => ({ name: s.label, number: s.value })),
    })),
  };
}

// агрегатор: тянет оба источника и возвращает готовую вью‑модель
async function _fetchHomeView(): Promise<HomeViewModel> {
  const [home, rawList] = await Promise.all([
    fetchHomeContent(),
    fetchOwnedEventsRaw(),
  ]);

  const ownedEvents = buildOwnedEvents(
    home.owned_events_meta.events,
    rawList,
    home.owned_events_meta.title,
    home.owned_events_meta.sub_title
  );

  return {
    hero: home.hero,
    mission: home.mission,
    events: home.events,
    mission_secondary: home.mission_secondary,
    partners: home.partners,
    latest: home.latest,
    ownedEvents, // уже собран
  };
}

// кэшируем агрегатор (можно теми же тегами)
export const fetchHomeView = unstable_cache(_fetchHomeView, ["home-view"], {
  revalidate: 60,
  tags: ["home", "owned-events"],
});

const HOME_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/home-page-settings`;

async function fetchHomeOptionsRaw(): Promise<any> {
  const res = await fetch(HOME_URL);
  if (!res.ok) throw new Error(`home options HTTP ${res.status}`);
  return res.json();
}

const fetchHomeOptions = unstable_cache(fetchHomeOptionsRaw, ["home-options"], {
  revalidate: 60,
  tags: ["home"],
});

export async function fetchHomeContent(): Promise<HomeContent> {
  const json = await fetchHomeOptions();
  const acf = json.acf ?? {};

  const hero: HeroData = {
    title: acf.hero?.title ?? "",
    video: acf.hero?.media?.url ?? "",
  };

  const mission: MissionData = {
    sub_title: acf.mission_block?.sub_title ?? "",
    content: acf.mission_block?.[""] ?? "",
  };

  const rawE = acf.bbr_events || {};
  const events: EventItem[] = ["slide_one", "slide_two", "slide_third"]
    .map((key) => {
      const slide = rawE[key];
      if (!slide) return null;
      return {
        title: slide.title || "",
        sub_title: slide.sub_title || "",
        video: slide.video?.url || "",
      };
    })
    .filter((e): e is EventItem => e !== null);

  const ms = acf.mission_secondary || {};
  const mission_secondary: MissionSecondaryData = {
    title: ms.title ?? "",
    sub_title: ms.sub_title ?? "",
    content: ms.text ?? "",
    items: Array.isArray(ms.items)
      ? ms.items.map((it: any) => ({
          icon: it.icon?.url ?? "",
          label: it.label ?? "",
          link: it.link?.url ?? "",
        }))
      : [],
  };

  const p = acf.partners || {};
  const rawLogos = Array.isArray(p[""]) ? p[""] : [];
  const partners: PartnersData = {
    sub_title: p.sub_title ?? "",
    logos: rawLogos.map((item: any) => item.url as string).filter(Boolean),
  };

  const lt = acf.latest || {};
  const latest: LatestData = {
    sub_title: lt.sub_title ?? "",
    instagram_links: Array.isArray(lt.instagram_links)
      ? lt.instagram_links
          .map((it: any) => it.links?.url ?? "")
          .filter((u: string) => u.length > 0)
      : [],
  };

  const oe = acf.owned_events || {};
  const owned_events_meta: OwnedEventsMetaRaw = {
    sub_title: oe.subtittle ?? oe.sub_title ?? "",
    title: oe.tittle ?? oe.title ?? "",
    events: Array.isArray(oe.events)
      ? oe.events.map((id: any) => Number(id)).filter((n: number) => !isNaN(n))
      : [],
  };

  const seo_settings: SeoSettings = {
    meta_title: acf.seo_settings?.meta_title ?? "",
    meta_description: acf.seo_settings?.meta_description ?? "",
    social_image: {
      url: acf.seo_settings?.social_image?.url ?? "",
      alt: acf.seo_settings?.social_image?.alt ?? "",
    },
  };

  return {
    hero,
    mission,
    events,
    mission_secondary,
    partners,
    latest,
    owned_events_meta,
    seo_settings,
  };
}
