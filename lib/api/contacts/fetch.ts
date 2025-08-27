import { unstable_cache } from "next/cache";
import type { Contact, ContactSettings } from "./types";
import { API_DOMAIN } from "../config";

const CONTACT_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/contact`;
const TAG = "contact";

/* ——— базовый кэшируемый источник (RAW json) ——— */
async function fetchContactOptionsRow(): Promise<any> {
  const res = await fetch(CONTACT_URL, { next: { revalidate: 2, tags: [TAG] } });
  if (!res.ok) throw new Error(`contact options HTTP ${res.status}`);
  return res.json();
}

const getContactOptions = unstable_cache(
  fetchContactOptionsRow,
  ["contact:options"],
  { revalidate: 1, tags: [TAG] }
);

/* ——— мапперы ——— */
function mapAcfToContact(acf: any): Contact {
  return {
    contact_hero_title: acf?.contact_hero_title ?? "",
    contact_hero_image: {
      url: acf?.contact_hero_image?.url ?? "",
      alt: acf?.contact_hero_image?.alt ?? "",
    },

    contact_section_sub_title: acf?.contact_section_sub_title ?? "",
    contact_section_tittle:    acf?.contact_section_tittle    ?? "",
    social_tittle:             acf?.contact_social_tittle     ?? "",

    contact_info: {
      phone_number:  acf?.contact_info?.phone_number  ?? "",
      phone_link:    acf?.contact_info?.phone_link    ?? "",
      email_address: acf?.contact_info?.email_address ?? "",
      email_link:    acf?.contact_info?.email_link    ?? "",
      postal_address:acf?.contact_info?.postal_address ?? "",
    },

    social_links: Array.isArray(acf?.social_links)
      ? acf.social_links.map((sl: any) => ({
          link_url:   sl?.link_url ?? "",
          icon_image: {
            url: sl?.icon_image?.url ?? "",
            alt: sl?.icon_image?.alt ?? "",
          },
        }))
      : [],

    contact_form_labels: {
      name_label:    acf?.contact_form_labels?.name_label    ?? "Name*",
      email_label:   acf?.contact_form_labels?.email_label   ?? "Email*",
      phone_label:   acf?.contact_form_labels?.phone_label   ?? "Phone Number",
      enquiry_label: acf?.contact_form_labels?.enquiry_label ?? "Enquiry Type*",
      message_label: acf?.contact_form_labels?.message_label ?? "Message",
    },

    enquiry_types: Array.isArray(acf?.enquiry_types)
      ? acf.enquiry_types.map((e: any) => ({
          label: e?.label ?? "",
          value: e?.value ?? "",
        }))
      : [],

    seo_contact: {
      title:            acf?.seo_contact?.title            ?? "",
      meta_description: acf?.seo_contact?.meta_description ?? "",
      seo_image: {
        url: acf?.seo_contact?.seo_image?.url ?? "",
        alt: acf?.seo_contact?.seo_image?.alt ?? "",
      },
    },
  };
}

function mapAcfToContactSettings(acf: any): ContactSettings {
  return {
    postal_address: acf?.contact_info?.postal_address ?? "",
    copyright:      acf?.copyright ?? "",
    social_links: Array.isArray(acf?.social_links)
      ? acf.social_links.map((item: any) => ({
          link_url: item?.link_url ?? "",
          icon_url: item?.icon_image?.url ?? "",
          icon_alt: item?.icon_image?.alt ?? "",
        }))
      : [],
  };
}

/* ——— публичные функции ——— */
export async function fetchContactContent(): Promise<Contact> {
  const json = await getContactOptions();
  return mapAcfToContact(json?.acf ?? {});
}

export async function fetchContactSettings(): Promise<ContactSettings> {
  const json = await getContactOptions();
  return mapAcfToContactSettings(json?.acf ?? {});
}
