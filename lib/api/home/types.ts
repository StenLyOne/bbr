import { SeoSettings } from "../seo";

export interface HeroData {
  title: string;
  video: string;
}

export interface MissionData {
  sub_title: string;
  content: string;
  title: string;
}

export interface EventItem {
  title: string;
  sub_title: string;
  video: string;
}

export interface MissionSecondaryItem {
  icon: string;
  label: string;
  link: string;
}

export interface MissionSecondaryData {
  title: string;
  sub_title: string;
  content: string;
  items: MissionSecondaryItem[];
}

export interface PartnersData {
  sub_title: string;
  logos: string[];
}

export interface LatestData {
  sub_title: string;
  instagram_links: string[];
}

export interface OwnedEventsMetaRaw {
  events: number[];
  sub_title: string;
  title: string;
}

export type HomeContent = {
  hero: HeroData;
  mission: MissionData;
  events: EventItem[];
  mission_secondary: MissionSecondaryData;
  partners: PartnersData;
  latest: LatestData;
  owned_events_meta: OwnedEventsMetaRaw;
  seo_settings: SeoSettings;
};

export type HomeViewModel = {
  hero: HeroData;
  mission: MissionData;
  events: EventItem[];
  mission_secondary: MissionSecondaryData;
  partners: PartnersData;
  latest: LatestData;
  ownedEvents: OwnedEventsData | null; // уже собранный блок
};

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
