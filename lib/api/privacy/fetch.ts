import { unstable_cache } from "next/cache";
import type { Privacy } from "./types";

import { API_DOMAIN } from "../config";

const PRIVACY_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/privacy`;

async function fetchPrivacyRow(): Promise<any> {
  const res = await fetch(PRIVACY_URL);
  if (!res.ok) throw new Error(`privacy option HTTP ${res.status}`);
  return res.json();
}

const fetchPrivacyOptions = unstable_cache(
  fetchPrivacyRow,
  ["privacy-options"],
  {
    revalidate: 60,
    tags: ["privacy"],
  }
);

export async function fetchPrivacyContent(): Promise<Privacy> {
  const json = await fetchPrivacyOptions();
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
