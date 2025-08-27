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
    title: string;
    meta_description: string;
    // мапирамо seo_image (string или објекат) у social_image
    social_image: {
      url: string;
      alt: string;
    };
  };
}
