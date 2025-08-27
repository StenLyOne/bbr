import { SeoSettings } from "../seo";

export interface EventHeroData {
  title: string;
  description: string;
}

export interface EventManagementBlock {
  sub_title: string;
  title: string;
  description: string;
  media_large: { url: string; alt: string };
  media_small: { url: string; alt: string };
  content: Array<{
    title: string;
    description: string;
    media?: { url: string; alt: string };
  }>;
}

export interface EventCarousel {
  title: string;
  gallery: string[];
}

export interface EventServiceItem {
  title: string;
  description: string;
  media: { url: string; alt: string };
}

export interface EventServicesBlock {
  sub_title: string;
  title: string;
  content: EventServiceItem[];
}

export interface SomeWorkItem {
  id: number;
  slug: string;
  title: string;
  hero_image: { url: string; alt?: string; [key: string]: any };
  work_type: string;
}

export interface SomeOfOurWorkBlock {
  title: string;
  works: SomeWorkItem[];
}

export interface EventManagement {
  hero: EventHeroData;
  management: EventManagementBlock;
  carousel: EventCarousel;
  services: EventServicesBlock;
  some_of_our_work: SomeOfOurWorkBlock;
  seo: SeoSettings;
}

export type OwnedEventRaw = {
  id: number;
  slug: string;
  title: string;
  acf: {
    media: {
      logo: { url: string; alt?: string };
      hero_image: { url: string; alt?: string };
      alt: string;
    };
    stats_block?: {
      stats?: { label: string; value: string }[];
    };
  };
};

export interface OwnedEventStat {
  name: string;
  number: string;
}

export interface OwnedEventItem {
  name: string;
  link: string;
  media: {
    image_src: string;
    logo_src: string;
    alt: string;
  };
  stats: OwnedEventStat[];
}

export interface OwnedEventsData {
  sub_title: string;
  title: string;
  events: OwnedEventItem[];
}

export type OwnedEventsRaw = OwnedEventRaw[];


export interface OwnedEventSettings {
  hero: {
    title: string;
    description: string;
  };
  seo: {
    title: string;
    meta_description: string;
    image: { url: string; alt?: string };
  };
}

export interface OwnedEvent {
  id: number;
  slug: string;
  title: string;
  logo: string;
  hero_image: string;
}

export interface OwnedEventItemData {
  id: number;
  slug: string;
  title: string;

  /* media → logo + hero_image + video */
  media: {
    logo: string;
    hero_image: string;
    video: string;
  };

  event_information: {
    title: string;
    subtitle: string; // ← dodaj
    sub_title: string; // ← dodaj
    text: string;
    info_block: Array<{ title: string; value: string }>;
  };

  gallery: string[];

  stats_block: {
    sub_title: string;
    title: string;
    indicators: string[];
    stats: Array<{ label: string; value: string }>;
  };

  sponsors: {
    sub_title: string;
    items: string[]; // logo URL‑ovi
  };

  cta: Array<{ label: string; link: string }>;

  seo_owned_event: {
    title: string;
    meta_description: string;
    seo_image: { url: string; alt: string };
  };

  /* lista ID‑jeva za “more events” ako je potrebna */
  more_events_ids: number[];
}

export interface OwnedEventTeaser {
  id: number;
  slug: string;
  title: string;
  media: { hero_image: string };
  event_information: { text: string };
}