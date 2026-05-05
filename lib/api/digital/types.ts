export interface DigitalContent {
  hero: {
    title: string;
    description: string;
  };
  communications: {
    sub_title: string;
    title: string;
    title_big: string;
    description: string;
    video_src: string;
    image: {
      src: string;
      alt: string;
    };
    stats: Array<{
      label: string;
      value: string;
    }>;
  };
  /** Ово је главни наслов двоколоне секције (“Services”) */
  two_column_title: string;
  /** Ово су она 4 “двоколона” блока: MARKETING, PAID STRATEGY… */
  two_column: Array<{
    title: string;
    description: string;
    media: { image_src: string; alt?: string };
  }>;
  /** Ово је ваша grid секција “What We Offer” (иконe + текст) */
  what_we_offer: {
    sub_title: string;
    title: string;
    description: string;
    social_media: Array<{
      icon_src: string;
      url: string;
      alt?: string;
    }>;
    content: Array<{
      title: string;
      description: string;
      icon_src: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
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
  our_client_network: {
    sub_title: string;
    gallery: string[];
  };
  latest_meta: {
    title: string;
    ids: number[];
  };
  seo: {
    title: string;
    meta_description: string;
    image: { url: string; alt?: string };
  };
}
