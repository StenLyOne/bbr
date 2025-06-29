// lib\api.ts

export const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN!;

async function fetchHomeOptions(): Promise<any> {
  const res = await fetch(
    `${API_DOMAIN}/wp-json/bbr/v1/options/home-page-settings`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Failed to fetch options: ${res.status}`);
  return res.json();
}

export interface HeroData {
  title: string;
  video: string;
}

export interface MissionData {
  sub_title: string;
  content:   string;
}

export interface EventItem {
  title:     string;
  sub_title: string;
  video:     string;
}

export interface MissionSecondaryItem {
  icon:  string;
  label: string;
  link:  string;
}

export interface MissionSecondaryData {
  title:     string;
  sub_title: string;
  content:   string;
  items:     MissionSecondaryItem[];
}

export interface PartnersData {
  sub_title: string;
  logos:     string[];
}

export interface LatestData {
  sub_title:       string;
  instagram_links: string[];
}

export interface OwnedEventsMetaRaw {
  events:    number[];
  sub_title: string;
  title:     string;
}

export interface OwnedEventsRaw {
  id:    number;
  slug:  string;
  title: string;
  acf: {
    media: {
      logo:       { url: string; alt?: string };
      hero_image: { url: string; alt?: string };
      alt:        string;
    };
    stats_block?: {
      stats?: { label: string; value: string }[];
    };
  };
}

export interface OwnedEventStat {
  name:   string;
  number: string;
}

export interface OwnedEventItem {
  name: string;
  link: string;
  media: {
    image_src: string;
    logo_src:  string;
    alt:       string;
  };
  stats: OwnedEventStat[];
}

export interface OwnedEventsData {
  sub_title: string;
  title:     string;
  events:    OwnedEventItem[];
}

export interface SeoSettings {
  meta_title:       string;
  meta_description: string;
  social_image: {
    url: string;
    alt: string;
  };
}

export async function fetchOwnedEventsRaw(): Promise<OwnedEventsRaw[]> {
  const res = await fetch(
    `${API_DOMAIN}/wp-json/bbr/v1/options/home-page-settings/owned-events`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Failed to fetch owned-events: ${res.status}`);
  return res.json();
}

export async function fetchHomeContent(): Promise<{
  hero:             HeroData;
  mission:          MissionData;
  events:           EventItem[];
  mission_secondary: MissionSecondaryData;
  partners:         PartnersData;
  latest:           LatestData;
  owned_events_meta: OwnedEventsMetaRaw;
  seo_settings:     SeoSettings;
}> {
  const json = await fetchHomeOptions();
  const acf  = json.acf || {};

  const hero: HeroData = {
    title: acf.hero?.title ?? "",
    video: acf.hero?.media?.url ?? "",
  };

  const mission: MissionData = {
    sub_title: acf.mission_block?.sub_title ?? "",
    content:   acf.mission_block?.[""] ?? "",
  };

  const rawE = acf.bbr_events || {};
  const events: EventItem[] = ["slide_one", "slide_two", "slide_third"]
    .map((key) => {
      const slide = rawE[key];
      if (!slide) return null;
      return {
        title:     slide.title || "",
        sub_title: slide.sub_title || "",
        video:     slide.video?.url || "",
      };
    })
    .filter((e): e is EventItem => e !== null);

  const ms = acf.mission_secondary || {};
  const mission_secondary: MissionSecondaryData = {
    title:     ms.title ?? "",
    sub_title: ms.sub_title ?? "",
    content:   ms.text ?? "",
    items: Array.isArray(ms.items)
      ? ms.items.map((it: any) => ({
          icon:  it.icon?.url ?? "",
          label: it.label ?? "",
          link:  it.link?.url ?? "",
        }))
      : [],
  };

  const p = acf.partners || {};
  const rawLogos = Array.isArray(p[""]) ? p[""] : [];
  const partners: PartnersData = {
    sub_title: p.sub_title ?? "",
    logos:     rawLogos.map((item: any) => item.url as string).filter(Boolean),
  };

  const lt = acf.latest || {};
  const latest: LatestData = {
    sub_title:       lt.sub_title ?? "",
    instagram_links: Array.isArray(lt.instagram_links)
      ? lt.instagram_links.map((it: any) => it.links?.url ?? "").filter((u: string) => u.length > 0)
      : [],
  };

  const oe = acf.owned_events || {};
  const owned_events_meta: OwnedEventsMetaRaw = {
    sub_title: oe.subtittle ?? oe.sub_title ?? "",
    title:     oe.tittle   ?? oe.title     ?? "",
    events:    Array.isArray(oe.events)
      ? oe.events.map((id: any) => Number(id)).filter((n: number) => !isNaN(n))
      : [],
  };

  const seo_settings: SeoSettings = {
    meta_title:       acf.seo_settings?.meta_title       ?? "",
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


export interface OurStoryData {
  hero: {
    title: string;
    description: string;
  };
  what_we_do: {
    sub_title: string;
    title: string;
    description: string;
    media: { image_src: string; alt: string };
  };
  where_we_started: {
    sub_title: string;
    content: Array<{
      title: string;
      description: string[];
      media: { image_src: string; alt: string };
    }>;
  };
  timeline: {
    sub_title: string;
    title: string;
    content: Array<{
      date: string;
      description: string;
      media: { image_src: string; alt: string; logo_src: string };
    }>;
  };
  testimonial: {
    sub_title: string;
    title: string;
    testimonials: Array<{
      description: string;
      name: string;
      job: string;
      company: string;
      logo_src: string;
    }>;
  };
  
}

export interface OurStoryData {
  hero: {
    title: string;
    description: string;
  };
  what_we_do: {
    sub_title: string;
    title: string;
    description: string;
    media: { image_src: string; alt: string };
  };
  where_we_started: {
    sub_title: string;
    content: Array<{
      title: string;
      description: string[];
      media: { image_src: string; alt: string };
    }>;
  };
  timeline: {
    sub_title: string;
    title: string;
    content: Array<{
      date: string;
      description: string;
      media: { image_src: string; alt: string; logo_src: string };
    }>;
  };
  testimonial: {
    sub_title: string;
    title: string;
    testimonials: Array<{
      description: string;
      name: string;
      job: string;
      company: string;
      logo_src: string;
    }>;
  };
  // Додато за SEO
  seo_our_story: {
    title:            string;
    meta_description: string;
    // мапирамо seo_image (string или објекат) у social_image
    social_image: {
      url: string;
      alt: string;
    };
  };
}

export async function fetchOurStoryContent(): Promise<OurStoryData> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/options/our-story`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch Our Story: ${res.status}`);
  const json = await res.json();
  const acf = json.acf || {};

  return {
    hero: {
      title: acf["hero-os"]?.["title-os"] ?? "",
      description: acf["hero-os"]?.["description-os"] ?? "",
    },

    what_we_do: {
      sub_title: acf.what_we_do?.sub_title ?? "",
      title: acf.what_we_do?.title ?? "",
      description: acf.what_we_do?.description ?? "",
      media: {
        image_src: acf.what_we_do?.media?.image?.url ?? "",
        alt: acf.what_we_do?.media?.image?.alt ?? "",
      },
    },

    where_we_started: {
      sub_title: acf.where_we_started_our_story?.sub_title ?? "",
      content: (acf.where_we_started_our_story?.content ?? []).map((item: any) => ({
        title: item.title ?? "",
        description: Array.isArray(item.description)
          ? item.description
          : [item.description ?? ""],
        media: {
          image_src: item.media?.image?.url ?? "",
          alt: item.media?.image?.alt ?? "",
        },
      })),
    },

    timeline: {
      sub_title: acf.timeline?.sub_title ?? "",
      title: acf.timeline?.title ?? "",
      content: (acf.timeline?.content ?? []).map((item: any) => ({
        date: item.date ?? "",
        description: item.description ?? "",
        media: {
          image_src: item.media?.image?.url ?? "",
          alt: item.media?.image?.alt ?? "",
          logo_src: item.media?.logo?.url ?? "",
        },
      })),
    },

    testimonial: {
      sub_title: acf.testimonial?.sub_title ?? "",
      title: acf.testimonial?.title ?? "",
      testimonials: (acf.testimonial?.testimonials ?? []).map((item: any) => ({
        description: item.description ?? "",
        name: item.name ?? "",
        job: item.job ?? "",
        company: item.company ?? "",
        logo_src: item.media?.url ?? "",
      })),
    },

    // Овде смо додали SEO поља
    seo_our_story: {
      title:            acf.seo_our_story?.title            ?? "",
      meta_description: acf.seo_our_story?.meta_description ?? "",
      social_image: {
        // АCF ти вероватно враћа само стринг у seo_image, па га узимаш директно
        url: typeof acf.seo_our_story?.seo_image === "string"
             ? acf.seo_our_story.seo_image
             : acf.seo_our_story?.seo_image?.url ?? "",
        // Ако имаш посебно alt поље, узмеш га, иначе оставиш празан
        alt: acf.seo_our_story?.seo_image?.alt ?? "",
      },
    },
  };
}

export interface CookiesData {
  title_cookies: string;
  description_cookies: string;
  seo_cookies: {
    title: string;
    meta_description: string;
    seo_image: {
      url: string;
      alt: string;
    };
  };
}

export async function fetchCookiesContent(): Promise<CookiesData> {
  const res = await fetch(
    `${API_DOMAIN}/wp-json/bbr/v1/options/cookies`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch Cookies: ${res.status}`);
  }
  const json = await res.json();
  const acf = json.acf || {};

  return {
    title_cookies: acf.title_cookies ?? "",
    description_cookies: acf.description_cookies ?? "",
    seo_cookies: {
      title: acf.seo_cookies?.title ?? "",
      meta_description: acf.seo_cookies?.meta_description ?? "",
      seo_image: {
        url: acf.seo_cookies?.seo_image?.url ?? "",
        alt: acf.seo_cookies?.seo_image?.alt ?? "",
      },
    },
  };
}

export interface PrivacyData {
  title_privacy: string;
  description_privacy: string;
  seo_privacy: {
    tittle: string;
    meta_description: string;
    seo_image: {
      url: string;
      alt: string;
    };
  };
}

export async function fetchPrivacyContent(): Promise<PrivacyData> {
  const res = await fetch(
    `${API_DOMAIN}/wp-json/bbr/v1/options/privacy`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch Privacy: ${res.status}`);
  }
  const json = await res.json();
  const acf = json.acf || {};

  return {
    title_privacy: acf.title_privacy ?? "",
    description_privacy: acf.description_privacy ?? "",
    seo_privacy: {
      tittle: acf.seo_privacy?.tittle ?? "",
      meta_description: acf.seo_privacy?.meta_description ?? "",
      seo_image: {
        url: acf.seo_privacy?.seo_image?.url ?? "",
        alt: acf.seo_privacy?.seo_image?.alt ?? "",
      },
    },
  };
}
