export interface PortfolioItemRaw {
  id: number;
  slug: string;
  title: string;
  acf: {
    event_information: {
      title: string;
      text: string;
    };
    media: {
      hero_image: {
        url: string;
        alt?: string;
      };
    };
  };
}

export interface SimpleWork {
  id: number;
  slug: string;
  title: string;
  work_type: string;
  tag: string;
  media: { hero_image: string };
}

export interface PortfolioSettings {
  hero_port: {
    title_port: string;
    description_port: string;
  };
  more_events: {
    title: string;
    link: string;
  };
  seo: {
    title: string;
    meta_description: string;
    image: string;
  };
}

export interface PortfolioTeaser {
  id: number;
  slug: string;
  title: string;

  /* MoreEvents u JSX‑u čita baš ovo ↓ */
  work_type: string;
  tag: string;
  media: {
    hero_image: string; // ili objekat sa .url – oba rade
  };
  event_information: {
    // ← ovo je falilo
    text: string;
  };
}