// lib\api.ts
// import { unstable_cache, revalidateTag } from "next/cache";

// типы

export const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN!;

// export interface PortfolioTeaser {
//   id: number;
//   slug: string;
//   title: string;

//   /* MoreEvents u JSX‑u čita baš ovo ↓ */
//   work_type: string;
//   tag: string;
//   media: {
//     hero_image: string; // ili objekat sa .url – oba rade
//   };
//   event_information: {
//     // ← ovo je falilo
//     text: string;
//   };
// }

// export async function fetchPortfolioTeasers(): Promise<PortfolioTeaser[]> {
//   const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/portfolio-teasers`, {
//     cache: "no-store",
//   });
//   if (!res.ok) throw new Error(`Failed to fetch teasers: ${res.status}`);

//   const data = await res.json();
//   return (data as any[]).map((item) => ({
//     id: item.id,
//     slug: item.slug,
//     title: item.title,

//     work_type: "", // popuni ako budeš imao
//     tag: "",

//     media: {
//       hero_image: item.image, // MoreEvents prvo pokuša .url, pa string
//     },

//     event_information: {
//       //  ✔ sprečava “reading 'text'” grešku
//       text: item.description ?? "",
//     },
//   }));
// }

/* =======================================================================
 *  OUR‑OWNED‑EVENTS  (id, slug, detalj, teaser)
 * =====================================================================*/

/*-----------------------------------------------------------*
 |  1)  /event-slugs   →  [{ id, slug }]
 *-----------------------------------------------------------*/
// export async function fetchOwnedEventSlugs(): Promise<
//   { id: number; slug: string }[]
// > {
//   const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/event-slugs`, {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error(`Failed to fetch event slugs: ${res.status}`);
//   }
//   return res.json();
// }

/*-----------------------------------------------------------*
 |  2)  /event-items/:slug   →  detaljna stranica
 *-----------------------------------------------------------*/
// export interface OwnedEventItemData {
//   id: number;
//   slug: string;
//   title: string;

//   /* media → logo + hero_image + video */
//   media: {
//     logo: string;
//     hero_image: string;
//     video: string;
//   };

//   event_information: {
//     title: string;
//     subtitle: string; // ← dodaj
//     sub_title: string; // ← dodaj
//     text: string;
//     info_block: Array<{ title: string; value: string }>;
//   };

//   gallery: string[];

//   stats_block: {
//     sub_title: string;
//     title: string;
//     indicators: string[];
//     stats: Array<{ label: string; value: string }>;
//   };

//   sponsors: {
//     sub_title: string;
//     items: string[]; // logo URL‑ovi
//   };

//   cta: Array<{ label: string; link: string }>;

//   seo_owned_event: {
//     title: string;
//     meta_description: string;
//     seo_image: { url: string; alt: string };
//   };

//   /* lista ID‑jeva za “more events” ako je potrebna */
//   more_events_ids: number[];
// }

// export async function fetchOwnedEventItem(
//   slug: string
// ): Promise<OwnedEventItemData> {
//   const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/event-items/${slug}`, {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error(`Owned event ${slug} → ${res.status}`);
//   }

//   const js = await res.json();
//   const acf = js.acf || {};

//   const media = acf.media || {};

//   return {
//     id: js.id,
//     slug: js.slug,
//     title: js.title,

//     media: {
//       logo: media.logo?.url ?? "",
//       hero_image: media.hero_image?.url ?? "",
//       video: acf.video?.url ?? "",
//     },

//     event_information: {
//       title: acf.event_information?.title ?? "",
//       subtitle:
//         acf.event_information?.subtitle ??
//         acf.event_information?.sub_title ??
//         "",
//       sub_title:
//         acf.event_information?.sub_title ??
//         acf.event_information?.subtitle ??
//         "",
//       text: acf.event_information?.text ?? "",
//       info_block: Array.isArray(acf.event_information?.info_block)
//         ? acf.event_information.info_block
//         : [],
//     },

//     gallery: Array.isArray(acf.gallery)
//       ? acf.gallery.map((g: any) => (typeof g === "string" ? g : g.url ?? ""))
//       : [],

//     stats_block: {
//       sub_title: acf.stats_block?.sub_title ?? "",
//       title: acf.stats_block?.title ?? "",
//       indicators: Array.isArray(acf.stats_block?.indicators)
//         ? acf.stats_block.indicators.map(
//             (i: any) => i.indicator_text ?? i ?? ""
//           )
//         : [],
//       stats: Array.isArray(acf.stats_block?.stats) ? acf.stats_block.stats : [],
//     },

//     sponsors: {
//       sub_title: acf.sponsors?.sub_title ?? "",
//       items: Array.isArray(acf.sponsors?.items)
//         ? acf.sponsors.items.map((l: any) => l.url ?? "")
//         : [],
//     },

//     cta: Array.isArray(acf.cta)
//       ? acf.cta.map((btn: any) => ({
//           label: btn.label ?? "",
//           link: btn.link?.url ?? "",
//         }))
//       : [],

//     seo_owned_event: {
//       title: acf.seo_owned_event?.title ?? "",
//       meta_description: acf.seo_owned_event?.meta_description ?? "",
//       seo_image: {
//         url: acf.seo_owned_event?.seo_image?.url ?? "",
//         alt: acf.seo_owned_event?.seo_image?.alt ?? "",
//       },
//     },

//     more_events_ids: Array.isArray(js.more_events)
//       ? js.more_events
//           .map((p: any): number => Number(p.ID))
//           .filter((n: number) => !isNaN(n)) //  ← dodali smo : number
//       : [],
//   };
// }

// /*-----------------------------------------------------------*
//  |  3)  /event-teasers   →  slider/card lista
//  *-----------------------------------------------------------*/
// export interface OwnedEventTeaser {
//   id: number;
//   slug: string;
//   title: string;
//   media: { hero_image: string };
//   event_information: { text: string };
// }

// export async function fetchOwnedEventTeasers(): Promise<OwnedEventTeaser[]> {
//   const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/event-teasers`, {
//     cache: "no-store",
//   });
//   if (!res.ok) {
//     throw new Error(`Failed to fetch event teasers: ${res.status}`);
//   }

//   const data = await res.json();
//   return (data as any[]).map((item) => ({
//     id: item.id,
//     slug: item.slug,
//     title: item.title,
//     media: {
//       hero_image: item.image,
//     },
//     event_information: {
//       text: item.description ?? "",
//     },
//   }));
// }

/* =======================================================================
 *  GLOBAL GENERAL INFO  (logo + favicon)
 * =====================================================================*/
export interface SiteLogos {
  logo: string;
  favicon: string;
}

/**  /bbr/v1/options/generalinfo  */
export async function fetchSiteLogos(): Promise<SiteLogos> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/options/generalinfo`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch site logos: ${res.status}`);
  }
  const json = await res.json();
  const logos = json.acf?.site_logos || {};
  return {
    logo: logos.logo ?? "",
    favicon: logos.favicon ?? "/favicon.ico", // fallback na default
  };
}
