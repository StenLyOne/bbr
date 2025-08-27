export interface PrContent {
  hero: {
    title: string;
    description: string;
    video_src: string;
  };
  where_we_started: {
    sub_title: string;
    title: string;
    content: Array<{
      title: string;
      description: string[];
      media: { image_src: string; alt: string };
    }>;
  };
  services: {
    sub_title: string;
    title: string;
    content: Array<{
      title: string;
      description: string;
      media: { image_src: string; alt: string };
    }>;
  };
  featured_on: {
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
    image: { url: string; alt: string };
  };
}