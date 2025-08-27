export interface Contact {
  contact_hero_title: string;
  contact_hero_image: { url: string; alt: string };
  contact_section_sub_title: string;
  contact_section_tittle: string;
  social_tittle: string;

  contact_info: {
    phone_number: string;
    phone_link: string;
    email_address: string;
    email_link: string;
    postal_address: string;
  };
  social_links: Array<{
    link_url: string;
    icon_image: { url: string; alt: string };
  }>;
  contact_form_labels: {
    name_label: string;
    email_label: string;
    phone_label: string;
    enquiry_label: string;
    message_label: string;
  };
  enquiry_types: Array<{ label: string; value: string }>;
  seo_contact: {
    title: string;
    meta_description: string;
    seo_image: { url: string; alt: string };
  };
}

export interface ContactSettings {
  postal_address: string;
  copyright: string;
  social_links: Array<{
    link_url: string;
    icon_url: string;
    icon_alt: string;
  }>;
}