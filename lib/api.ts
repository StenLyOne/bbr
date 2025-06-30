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


export interface ContactData {
  contact_hero_title: string;
  contact_hero_image: { url: string; alt: string };
  contact_section_sub_title: string;
contact_section_tittle: string;
social_tittle: string;


  contact_info: {
    phone_number:  string;
    phone_link:    string;
    email_address: string;
    email_link:    string;
    postal_address: string;
  };
  social_links: Array<{
    link_url:    string;
    icon_image:  { url: string; alt: string };
  }>;
  contact_form_labels: {
    name_label:    string;
    email_label:   string;
    phone_label:   string;
    enquiry_label: string;
    message_label: string;
  };
  enquiry_types: Array<{ label: string; value: string }>;
  seo_contact: {
    title:            string;
    meta_description: string;
    seo_image:        { url: string; alt: string };
  };
}

export async function fetchContactContent(): Promise<ContactData> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/options/contact`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch Contact: ${res.status}`);
  const json = await res.json();
  const acf = json.acf || {};

  return {
    contact_hero_title: acf.contact_hero_title ?? "",
    contact_hero_image: {
      url: acf.contact_hero_image?.url ?? "",
      alt: acf.contact_hero_image?.alt ?? "",
    },
    contact_section_sub_title: acf.contact_section_sub_title ?? "",
    contact_section_tittle:     acf.contact_section_tittle   ?? "",
    social_tittle:     acf.contact_social_tittle   ?? "",
    contact_info: {
      phone_number:  acf.contact_info?.phone_number  ?? "",
      phone_link:    acf.contact_info?.phone_link    ?? "",
      email_address: acf.contact_info?.email_address ?? "",
      email_link:    acf.contact_info?.email_link    ?? "",
      postal_address:acf.contact_info?.postal_address ?? "",
    },
    social_links: (acf.social_links ?? []).map((sl: any) => ({
      link_url:   sl.link_url,
      icon_image: { url: sl.icon_image.url, alt: sl.icon_image.alt },
    })),
    contact_form_labels: {
      name_label:    acf.contact_form_labels?.name_label    ?? "Name*",
      email_label:   acf.contact_form_labels?.email_label   ?? "Email*",
      phone_label:   acf.contact_form_labels?.phone_label   ?? "Phone Number",
      enquiry_label: acf.contact_form_labels?.enquiry_label ?? "Enquiry Type*",
      message_label: acf.contact_form_labels?.message_label ?? "Message",
    },
    enquiry_types: (acf.enquiry_types ?? []).map((e: any) => ({
      label: e.label,
      value: e.value,
    })),
    seo_contact: {
      title:            acf.seo_contact?.title            ?? "",
      meta_description: acf.seo_contact?.meta_description ?? "",
      seo_image: {
        url: acf.seo_contact?.seo_image?.url ?? "",
        alt: acf.seo_contact?.seo_image?.alt ?? "",
      },
    },
  };
}

// --- na vrhu fajla, ispod ostalih export interface-ova ---
export interface TeamMember {
  name:       string;
  position:   string;
  image_src:  string;
  linkedin:   string;
}

export interface Department {
  title:    string;
  members:  TeamMember[];
}

export interface TeamCTA {
  title:             string;
  button:            { text: string; link: string };
  background_image:  string;
}

export interface TeamSEO {
  meta_title:       string;
  meta_description: string;
  seo_image:        string;
}

export interface TeamContent {
  hero: {
    title: string;
    media: { image_src: string; alt: string };
  };
  intro: {
    sub_title:   string;
    title:       string;
    description: string;
  };
  departments: Department[];
  cta:         TeamCTA;
  seo:         TeamSEO;
}

// --- na dnu fajla ---
export async function fetchTeamContent(): Promise<TeamContent> {
  const res = await fetch(
    `${API_DOMAIN}/wp-json/bbr/v1/options/team`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Failed to fetch team: ${res.status}`);
  const json = await res.json();
  const acf  = json.acf || {};

  return {
    // HERO: uzimamo title_tm i media_tm.image_src_tm / alt_tm
     hero: {
          title: acf.hero_tm?.title_tm ?? "",
          media: {
            image_src: acf.hero_tm?.media_tm?.image_src_tm ?? "",
            alt:       acf.hero_tm?.media_tm?.alt_tm      ?? ""
          }
        },

    // INTRO
    intro: {
      sub_title:   acf.intro?.sub_title   ?? "",
      title:       acf.intro?.title       ?? "",
      description: acf.intro?.description ?? ""
    },

    // DEPARTMENTS
    departments: Array.isArray(acf.departments)
      ? acf.departments.map((dep: any) => ({
          title: dep.title ?? "",
          members: Array.isArray(dep.members)
            ? dep.members.map((m: any) => ({
                name:      m.name ?? "",
                position:  m.position ?? "",
                image_src: m.image_src ?? "",
                linkedin:  m.linkedin ?? ""
              }))
            : []
        }))
      : [],

    // CTA: pravimo ugnježdeni `button` objekat
    cta: {
      title:            acf.cta?.title            ?? "",
      button: {
        text: acf.cta?.button_text ?? "",
        link: acf.cta?.button_link ?? ""
      },
      background_image: acf.cta?.background_image ?? ""
    },

    // SEO
    seo: {
      meta_title:       acf.seo?.meta_title       ?? "",
      meta_description: acf.seo?.meta_description ?? "",
      seo_image:        acf.seo?.seo_image        ?? ""
    }
  };
}

// lib/api.ts

// … постојећи код …

// ---- Events page types & fetcher ----

export interface EventHeroData {
  title:        string;
  description:  string;
}

export interface EventManagementBlock {
  sub_title:    string;
  title:        string;
  description:  string;
  media_large:  { url: string; alt: string; };
  media_small:  { url: string; alt: string; };
  content: Array<{
    title:       string;
    description: string;
    media?:      { url: string; alt: string; };
  }>;
}

export interface EventCarousel {
  title:   string;
  gallery: string[];
}

export interface EventServiceItem {
  title:       string;
  description: string;
  media:       { url: string; alt: string; };
}

export interface EventServicesBlock {
  sub_title: string;
  title:     string;
  content:   EventServiceItem[];
}

export interface SomeWorkItem {
  id:         number;
  slug:       string;
  title:      string;
  hero_image: { url: string; alt?: string; [key:string]: any };
  work_type:  string;
}

export interface SomeOfOurWorkBlock {
  title: string;
  works: SomeWorkItem[];
}

export interface EventPageData {
  hero:           EventHeroData;
  management:     EventManagementBlock;
  carousel:       EventCarousel;
  services:       EventServicesBlock;
  some_of_our_work: SomeOfOurWorkBlock;
  seo:            SeoSettings;
}

export async function fetchEventPageContent(): Promise<EventPageData> {
  // истовремено дохватамо опције и списак радова
  const [optsRes, worksRes] = await Promise.all([
    fetch(`${API_DOMAIN}/wp-json/bbr/v1/options/eventmanagemet`, { cache: 'no-store' }),
    fetch(`${API_DOMAIN}/wp-json/bbr/v1/options/eventmanagemet/works`, { cache: 'no-store' }),
  ]);

  if (!optsRes.ok)  throw new Error(`Failed to fetch event page: ${optsRes.status}`);
  if (!worksRes.ok) throw new Error(`Failed to fetch event works: ${worksRes.status}`);

  const optsJson  = await optsRes.json();
  const worksJson: SomeWorkItem[] = await worksRes.json();
  const acf = optsJson.acf || {};

  return {
    hero: {
      title:       acf.hero_event?.title_event       ?? '',
      description: acf.hero_event?.description_event ?? '',
    },
    management: {
      sub_title:   acf.management?.sub_title        ?? '',
      title:       acf.management?.title            ?? '',
      description: acf.management?.description      ?? '',
      media_large: {
        url: acf.management?.media_large?.image?.url ?? '',
        alt: acf.management?.media_large?.image?.alt ?? '',
      },
      media_small: {
        url: acf.management?.media_small?.image?.url ?? '',
        alt: acf.management?.media_small?.image?.alt ?? '',
      },
      content: Array.isArray(acf.management?.content)
        ? acf.management.content.map((item: any) => ({
            title:       item.title       ?? '',
            description: item.description ?? '',
            media: item.media?.image
              ? { url: item.media.image.url ?? '', alt: item.media.image.alt ?? '' }
              : undefined,
          }))
        : [],
    },
    carousel: {
      title:   acf.carousel?.title   ?? '',
      gallery: Array.isArray(acf.carousel?.gallery)
        ? acf.carousel.gallery.map((img: any) => img.url ?? '').filter(Boolean)
        : [],
    },
    services: {
      sub_title: acf.services_event?.sub_title ?? '',
      title:     acf.services_event?.title     ?? '',
      content: Array.isArray(acf.services_event?.content)
        ? acf.services_event.content.map((item: any) => ({
            title:       item.title       ?? '',
            description: item.description ?? '',
            media: {
              url: item.media?.image?.url ?? '',
              alt: item.media?.image?.alt ?? '',
            },
          }))
        : [],
    },
    some_of_our_work: {
      title: acf.some_of_our_work?.title ?? '',
      works: worksJson,
    },
    seo: {
      meta_title:       acf.seo_event_management?.title            ?? '',
      meta_description: acf.seo_event_management?.meta_description ?? '',
      social_image: {
        url: acf.seo_event_management?.seo_image?.url ?? '',
        alt: acf.seo_event_management?.seo_image?.alt ?? '',
      },
    },
  };
}

export interface PortfolioItemRaw {
  id:   number;
  slug: string;
  title: string; 
  acf: {
    event_information: {
      title: string;
      text:  string;
    };
    media: {
      hero_image: {
        url:  string;
        alt?: string;
      };
    };
  };
}

export interface PrContent {
  hero: {
    title:       string;
    description: string;
    video_src:   string;
  };
  where_we_started: {
    sub_title: string;
    title:     string;
    content: Array<{
      title:       string;
      description: string[];
      media:       { image_src: string; alt: string };
    }>;
  };
  services: {
    sub_title: string;
    title:     string;
    content: Array<{
      title:       string;
      description: string;
      media:       { image_src: string; alt: string };
    }>;
  };
  featured_on: {
    sub_title: string;
    gallery:   string[];
  };
  latest_meta: {
    title: string;
    ids:   number[];
  };
  seo: {
    title:            string;
    meta_description: string;
    image:            { url: string; alt: string };
  };
}

/** Дохвата ACF податке за PR страницу */
export async function fetchPrContent(): Promise<PrContent> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/options/prservices`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch PR services: ${res.status}`);
  const json = await res.json();
  const acf = json.acf || {};

  // Hero
  const hero = {
    title:       acf.hero_pr?.title       ?? "",
    description: acf.hero_pr?.description ?? "",
    video_src:   acf.hero_pr?.video?.url  ?? "",
  };

  // Where We Started
  const wws = acf.where_we_started || {};
  const where_we_started = {
    sub_title: wws.sub_title ?? "",
    title:     wws.title     ?? "",
    content: Array.isArray(wws.content)
      ? wws.content.map((item: any) => ({
          title: item.title ?? "",
          description: (item.description ?? "")
            .split(/\r?\n/)
            .filter((s: string) => s.trim().length > 0),
          media: {
            image_src: item.media?.image?.url ?? "",
            alt:       item.media?.image?.alt ?? "",
          },
        }))
      : [],
  };

  // Services
  const srv = acf.services_pr || {};
  const services = {
    sub_title: srv.sub_title ?? "",
    title:     srv.title     ?? "",
    content: Array.isArray(srv.content)
      ? srv.content.map((item: any) => ({
          title:       item.title       ?? "",
          description: item.description ?? "",
          media: {
            image_src: item.media?.image?.url ?? "",
            alt:       item.media?.image?.alt ?? "",
          },
        }))
      : [],
  };

  // Featured On
  const feat = acf.featured_on || {};
  const featured_on = {
    sub_title: feat.sub_title ?? "",
    gallery:   Array.isArray(feat.gallery)
      ? feat.gallery.map((img: any) =>
          typeof img === "string" ? img : img.url
        )
      : [],
  };

  // Latest IDs
  const latest_meta = {
    title: acf.latest_pr?.tittle ?? "",
    ids: Array.isArray(acf.latest_pr?.latest_prr)
      ? acf.latest_pr.latest_prr
          .map((v: unknown): number => Number(v))
          .filter((n: number): n is number => !isNaN(n))
      : [],
  };

  // SEO
  const seo = {
    title:            acf.seo_pr?.title            ?? "",
    meta_description: acf.seo_pr?.meta_description ?? "",
    image: {
      url:
        typeof acf.seo_pr?.seo_image === "string"
          ? acf.seo_pr.seo_image
          : acf.seo_pr?.seo_image?.url ?? "",
      alt: acf.seo_pr?.seo_image?.alt ?? "",
    },
  };

  return { hero, where_we_started, services, featured_on, latest_meta, seo };
}

/** Дохвата portfolio‐items само оне са ID-јевима из latest_meta.ids */
export async function fetchPortfolioItemsByIds(
  ids: number[]
): Promise<PortfolioItemRaw[]> {
  if (ids.length === 0) return [];
  const res = await fetch(
    `${API_DOMAIN}/wp-json/bbr/v1/portfolio-items?include=${ids.join(",")}`,
    { cache: "no-store" }
  );
  if (!res.ok)
    throw new Error(`Failed to fetch portfolio items: ${res.status}`);
  return res.json();
}

export interface DigitalContent {
  hero: {
    title:       string;
    description: string;
  };
  communications: {
    sub_title:   string;
    title:       string;
    title_big:   string;
    description: string;
    video_src:   string;
  };
  /** Ово је главни наслов двоколоне секције (“Services”) */
  two_column_title: string;
  /** Ово су она 4 “двоколона” блока: MARKETING, PAID STRATEGY… */
  two_column: Array<{
    title:       string;
    description: string;
    media:       { image_src: string; alt?: string };
  }>;
  /** Ово је ваша grid секција “What We Offer” (иконe + текст) */
  what_we_offer: {
    sub_title:   string;
    title:       string;
    description: string;
    content: Array<{
      title:       string;
      description: string;
      icon_src:    string;
    }>;
  };
  latest_meta: {
    title: string;
    ids:   number[];
  };
  seo: {
    title:            string;
    meta_description: string;
    image:            { url: string; alt?: string };
  };
}

export async function fetchDigitalContent(): Promise<DigitalContent> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/options/digital`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch Digital options: ${res.status}`);
  const json = await res.json();
  const acf  = json.acf || {};

  // Hero
  const hero = {
    title:       acf.hero_digital?.title       ?? "",
    description: acf.hero_digital?.description ?? "",
  };

  // Communications (за видео + мали увод)
  const comm = acf.communications || {};
  const wwo  = acf.what_we_offer  || {}; // за title_big
  const communications = {
    sub_title:   comm.sub_title    ?? "",
    title:       comm.title        ?? "",
    title_big:   wwo.title         ?? "",  // title_big вучемо из what_we_offer.title
    description: comm.description  ?? "",
    video_src:   comm.video?.url   ?? "",
  };

  // Двоколона секција (MARKETING, PAID STRATEGY…)
  const two_column = Array.isArray(comm.services?.content)
    ? comm.services.content.map((item: any) => ({
        title:       item.content                       ?? "",
        description: item.description                   ?? "",
        media: {
          image_src: item.media?.image?.url             ?? "",
          alt:       item.media?.image?.alt             ?? "",
        },
      }))
    : [];

  // Главни наслов за ту секцију (“Services”)
  const two_column_title = comm.services?.title ?? "";

  // Grid секција “What We Offer”
  const what_we_offer = {
    sub_title:   wwo.sub_title_     ?? "",
    title:       wwo.title          ?? "",
    description: wwo.description    ?? "",
    content: Array.isArray(acf.what_we_offer?.content)
      ? acf.what_we_offer.content.map((item: any) => ({
          title:       item.content                       ?? "",
          description: item.description                   ?? "",
          icon_src:    item.media?.image?.url             ?? "",
        }))
      : [],
  };

  // Latest
  const latest_meta = {
    title: acf.latest_digital?.tittle_latest ?? "",
    ids: Array.isArray(acf.latest_digital?.latest_dwork)
      ? acf.latest_digital.latest_dwork
          .map((n: unknown) => Number(n))
         .filter((n: number): n is number => !isNaN(n))
      : [],
  };

  // SEO
  const seoacf = acf.seo_digital || {};
  const seo = {
    title:            seoacf.title            ?? "",
    meta_description: seoacf.meta_description ?? "",
    image: {
      url: seoacf.seo_image?.url ?? "",
      alt: seoacf.seo_image?.alt ?? "",
    },
  };

  return {
    hero,
    communications,
    two_column_title,
    two_column,
    what_we_offer,
    latest_meta,
    seo,
  };
}

// lib/api.ts

// --- 1) Portfolio Settings интерфејс и фетч ---
export interface PortfolioSettings {
  hero_port: {
    title_port:       string;
    description_port: string;
  };
  more_events: {
    title: string;
    link:  string;
  };
  seo: {
    title:            string;
    meta_description: string;
    image:            string;
  };
}

export async function fetchPortfolioSettings(): Promise<PortfolioSettings> {
  const res  = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/options/porfoliosettings`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch Portfolio settings: ${res.status}`);
  const json = await res.json();
  const acf  = json.acf || {};
  return {
    hero_port: {
      title_port:       acf.hero_port?.title_port       ?? "",
      description_port: acf.hero_port?.description_port ?? "",
    },
    more_events: {
      title: acf.more_events?.title ?? "",
      link:  acf.more_events?.link  ?? "",
    },
    seo: {
      title:            acf.seo_portfolio?.title            ?? "",
      meta_description: acf.seo_portfolio?.meta_description ?? "",
      image:            acf.seo_portfolio?.seo_image        ?? "",
    },
  };
}

// --- 2) SimpleWork тип и фетч за све портфолио item-е ---
export interface SimpleWork {
  id:        number;
  slug:      string;
  title:     string;
  work_type: string;
  tag:       string;
  media:     { hero_image: string };
}

export async function fetchPortfolioItems(): Promise<SimpleWork[]> {
  const res  = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/portfolio-items`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch Portfolio items: ${res.status}`);
  const json = await res.json();
  return (json as any[]).map(item => ({
    id:        item.id,
    slug:      item.slug,
    title:     item.title,
    work_type: item.acf.work_type,
    tag:       item.acf.tag,
    media:     { hero_image: item.acf.media.hero_image.url },
  }));
}


export interface OwnedEventSettings {
  hero: {
    title:       string;
    description: string;
  };
  seo: {
    title:            string;
    meta_description: string;
    image:            { url: string; alt?: string };
  };
}

export interface OwnedEvent {
  id:         number;
  slug:       string;
  title:      string;
  logo:       string;
  hero_image: string;
}

/** Fetch the ACF options for owned‑events page */
export async function fetchOwnedEventSettings(): Promise<OwnedEventSettings> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/options/ownedeventssettings`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch Owned Events settings: ${res.status}`);
  const json = await res.json();
  const acf  = json.acf || {};

  const hero = {
    title:       acf.hero_oe?.title_oe       ?? '',
    description: acf.hero_oe?.description_oe ?? '',
  };

  // ОВДЕ: узимамо из seo_ownedev, а не из seo
  const seoacf = acf.seo_ownedev || {};
  const seo = {
    title:            seoacf.title            ?? '',
    meta_description: seoacf.meta_description ?? '',
    image: {
      url: seoacf.seo_image   ?? '',
      alt: '',
    },
  };

  return { hero, seo };
}

/** Fetch the array of all owned events (id, slug, title, logo, hero_image) */
export async function fetchAllOwnedEvents(): Promise<OwnedEvent[]> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/allevents`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch all owned events: ${res.status}`);
  const data = await res.json() as Array<{
    id:         number;
    slug:       string;
    title:      string;
    logo:       string;
    hero_image: string;
  }>;
  return data.map(evt => ({
    id:         evt.id,
    slug:       evt.slug,
    title:      evt.title,
    logo:       evt.logo,
    hero_image: evt.hero_image,
  }));
}


export interface ContactSettings {
  postal_address: string;
  copyright:      string;
  social_links: Array<{
    link_url: string;
    icon_url: string;
    icon_alt: string;
  }>;
}

/** Fetch only the needed fields from ACF contact options */
export async function fetchContactSettings(): Promise<ContactSettings> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/options/contact`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch contact settings: ${res.status}`);
  }
  const json = await res.json();
  const acf  = json.acf || {};

  return {
    postal_address: acf.contact_info?.postal_address ?? "",
    copyright:      acf.copyright               ?? "",
    social_links:   (acf.social_links || []).map((item: any) => ({
      link_url: item.link_url,
      icon_url: item.icon_image?.url   ?? "",
      icon_alt: item.icon_image?.alt   ?? "",
    })),
  };
}


/** Fetch the list of all portfolio item slugs */
export async function fetchPortfolioSlugs(): Promise<{ id: number; slug: string }[]> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/portfolio-slugs`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch portfolio slugs: ${res.status}`);
  return res.json();
}

/*------------------------------------------------------------------
 *  PORTFOLIO ITEM  (individualni /slug)
 *-----------------------------------------------------------------*/

export interface PortfolioItemData {
  id:    number;
  slug:  string;
  title: string;

  media: {
    hero_image: string;
    video:      string;
  };

  event_information: {
    sub_title: string;
    title:     string;
    text:      string;
    info_block: {
      items: Array<{ title: string; value: string }>;
    };
  };

  gallery:     string[];
  stats_block: {
    sub_title:  string;
    title:      string;
    indicators: string[];
    stats:      Array<{ label: string; value: string }>;
  };

  sponsors: {
    sub_title: string;
    items:     string[];
  };

  cta: Array<{ label: string; link: string }>;

  /* ───── SEO (novo) ───── */
  seo_work: {
    title:            string;
    meta_description: string;
    seo_image: {
      url: string;
      alt: string;
    };
  };
}

/** Дохвата податке за /portfolio-items/:slug + SEO */
export async function fetchPortfolioItem(slug: string): Promise<PortfolioItemData> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/portfolio-items/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Portfolio item ${slug} → ${res.status}`);

  const js  = await res.json();
  const acf = js.acf || {};

  return {
    id:    js.id,
    slug:  js.slug,
    title: js.title,

    media: {
      hero_image: acf.media?.hero_image?.url ?? "",
      video:      acf.video?.url             ?? "",
    },

    event_information: {
      sub_title: acf.event_information?.sub_title ?? "",
      title:     acf.event_information?.title     ?? "",
      text:      acf.event_information?.text      ?? "",
      info_block: {
        items: Array.isArray(acf.event_information?.info_block)
          ? acf.event_information.info_block
          : [],
      },
    },

    gallery: Array.isArray(acf.gallery)
      ? acf.gallery.map((g: any) => (typeof g === "string" ? g : g.url ?? ""))
      : [],

    stats_block: {
      sub_title:  acf.stats_block?.sub_title ?? "",
      title:      acf.stats_block?.title     ?? "",
      indicators: Array.isArray(acf.stats_block?.indicators)
        ? acf.stats_block.indicators.map((i: any) => i.indicator_text ?? i ?? "")
        : [],
      stats: Array.isArray(acf.stats_block?.stats)
        ? acf.stats_block.stats
        : [],
    },

    sponsors: {
      sub_title: acf.sponsors?.sub_title ?? "",
      items: Array.isArray(acf.sponsors?.items)
        ? acf.sponsors.items.map((l: any) => l.url ?? "")
        : [],
    },

    cta: Array.isArray(acf.cta)
      ? acf.cta.map((btn: any) => ({
          label: btn.label ?? "",
          link:  btn.link?.url ?? "",
        }))
      : [],

    /* ───────────── SEO ───────────── */
    seo_work: {
      title:            acf.seo_work?.title            ?? "",
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


export interface PortfolioTeaser {
  id:   number;
  slug: string;
  title: string;

  /* MoreEvents u JSX‑u čita baš ovo ↓ */
  work_type: string;
  tag:       string;
  media: {
    hero_image: string;          // ili objekat sa .url – oba rade
  };
  event_information: {           // ← ovo je falilo
    text: string;
  };
}

export async function fetchPortfolioTeasers(): Promise<PortfolioTeaser[]> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/portfolio-teasers`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch teasers: ${res.status}`);

  const data = await res.json();
  return (data as any[]).map((item) => ({
    id:   item.id,
    slug: item.slug,
    title: item.title,

    work_type: "",      // popuni ako budeš imao
    tag:       "",

    media: {
      hero_image: item.image,          // MoreEvents prvo pokuša .url, pa string
    },

    event_information: {               //  ✔ sprečava “reading 'text'” grešku
      text: item.description ?? "",
    },
  }));
}

/* =======================================================================
 *  OUR‑OWNED‑EVENTS  (id, slug, detalj, teaser)
 * =====================================================================*/

/*-----------------------------------------------------------*
 |  1)  /event-slugs   →  [{ id, slug }]
 *-----------------------------------------------------------*/
export async function fetchOwnedEventSlugs(): Promise<
  { id: number; slug: string }[]
> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/event-slugs`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch event slugs: ${res.status}`);
  }
  return res.json();
}

/*-----------------------------------------------------------*
 |  2)  /event-items/:slug   →  detaljna stranica
 *-----------------------------------------------------------*/
export interface OwnedEventItemData {
  id:    number;
  slug:  string;
  title: string;

  /* media → logo + hero_image + video */
  media: {
    logo:       string;
    hero_image: string;
    video:      string;
  };

  event_information: {
   title:      string;
  subtitle:   string;   // ← dodaj
  sub_title:  string;   // ← dodaj
  text:       string;
  info_block: Array<{ title: string; value: string }>;
  };

  gallery: string[];

  stats_block: {
    sub_title:  string;
    title:      string;
    indicators: string[];
    stats:      Array<{ label: string; value: string }>;
  };

  sponsors: {
    sub_title: string;
    items:     string[];          // logo URL‑ovi
  };

  cta: Array<{ label: string; link: string }>;

  seo_owned_event: {
    title:            string;
    meta_description: string;
    seo_image:        { url: string; alt: string };
  };

  /* lista ID‑jeva za “more events” ako je potrebna */
  more_events_ids: number[];
}

export async function fetchOwnedEventItem(
  slug: string
): Promise<OwnedEventItemData> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/event-items/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Owned event ${slug} → ${res.status}`);
  }

  const js  = await res.json();
  const acf = js.acf || {};

  const media = acf.media || {};

  return {
    id:    js.id,
    slug:  js.slug,
    title: js.title,

    media: {
      logo:       media.logo?.url        ?? "",
      hero_image: media.hero_image?.url  ?? "",
      video:      acf.video?.url         ?? "",
    },

    event_information: {
      title:      acf.event_information?.title      ?? "",
  subtitle:   acf.event_information?.subtitle   ?? acf.event_information?.sub_title ?? "",
  sub_title:  acf.event_information?.sub_title  ?? acf.event_information?.subtitle  ?? "",
  text:       acf.event_information?.text       ?? "",
  info_block: Array.isArray(acf.event_information?.info_block)
                ? acf.event_information.info_block
                : [],
},

    gallery: Array.isArray(acf.gallery)
      ? acf.gallery.map((g: any) =>
          typeof g === "string" ? g : g.url ?? ""
        )
      : [],

    stats_block: {
      sub_title:  acf.stats_block?.sub_title ?? "",
      title:      acf.stats_block?.title     ?? "",
      indicators: Array.isArray(acf.stats_block?.indicators)
        ? acf.stats_block.indicators.map((i: any) => i.indicator_text ?? i ?? "")
        : [],
      stats: Array.isArray(acf.stats_block?.stats)
        ? acf.stats_block.stats
        : [],
    },

    sponsors: {
      sub_title: acf.sponsors?.sub_title ?? "",
      items: Array.isArray(acf.sponsors?.items)
        ? acf.sponsors.items.map((l: any) => l.url ?? "")
        : [],
    },

    cta: Array.isArray(acf.cta)
      ? acf.cta.map((btn: any) => ({
          label: btn.label ?? "",
          link:  btn.link?.url ?? "",
        }))
      : [],

    seo_owned_event: {
      title:            acf.seo_owned_event?.title            ?? "",
      meta_description: acf.seo_owned_event?.meta_description ?? "",
      seo_image: {
        url: acf.seo_owned_event?.seo_image?.url ?? "",
        alt: acf.seo_owned_event?.seo_image?.alt ?? "",
      },
    },

    more_events_ids: Array.isArray(js.more_events)
  ? js.more_events
      .map((p: any): number => Number(p.ID))
      .filter((n: number) => !isNaN(n))   //  ← dodali smo : number
  : [],
  };
}

/*-----------------------------------------------------------*
 |  3)  /event-teasers   →  slider/card lista
 *-----------------------------------------------------------*/
export interface OwnedEventTeaser {
  id:    number;
  slug:  string;
  title: string;
  media: { hero_image: string };
  event_information: { text: string };
}

export async function fetchOwnedEventTeasers(): Promise<OwnedEventTeaser[]> {
  const res = await fetch(`${API_DOMAIN}/wp-json/bbr/v1/event-teasers`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch event teasers: ${res.status}`);
  }

  const data = await res.json();
  return (data as any[]).map((item) => ({
    id:    item.id,
    slug:  item.slug,
    title: item.title,
    media: {
      hero_image: item.image,
    },
    event_information: {
      text: item.description ?? "",
    },
  }));
}

/* =======================================================================
 *  GLOBAL GENERAL INFO  (logo + favicon)
 * =====================================================================*/
export interface SiteLogos {
  logo:    string;
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
    logo:    logos.logo    ?? "",
    favicon: logos.favicon ?? "/favicon.ico",   // fallback na default
  };
}
