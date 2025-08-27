export interface TeamMember {
  name: string;
  position: string;
  image_src: string;
  linkedin: string;
}

export interface Department {
  title: string;
  members: TeamMember[];
}

export interface TeamCTA {
  title: string;
  button: { text: string; link: string };
  background_image: string;
}

export interface TeamSEO {
  meta_title: string;
  meta_description: string;
  seo_image: string;
}

export interface TeamContent {
  hero: {
    title: string;
    media: { image_src: string; alt: string };
  };
  intro: {
    sub_title: string;
    title: string;
    description: string;
  };
  departments: Department[];
  cta: TeamCTA;
  seo: TeamSEO;
}