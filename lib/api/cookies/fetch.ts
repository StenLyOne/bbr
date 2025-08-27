import { unstable_cache } from "next/cache";
import type { Cookies } from "./types";

import { API_DOMAIN } from "../config";

const COOKIES_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/cookies`;

async function fetchCookiesRow(): Promise<any> {
  const res = await fetch(COOKIES_URL);
  if (!res.ok) throw new Error(`cookies option HTTP ${res.status}`);
  return res.json();
}

const fetchCookiesOptions = unstable_cache(
  fetchCookiesRow,
  ["cookies-options"],
  {
    revalidate: 1,
    tags: ["cookies"],
  }
);

export async function fetchCookiesContent(): Promise<Cookies> {
  const json = await fetchCookiesOptions();
  const acf = json.acf || {};
  return {
    title_cookies: acf.title_cookies ?? "",
    description_cookies: acf.description_cookies ?? "",
    seo_cookies: {
      title: acf.seo_cookies?.title ?? "",
      meta_description: acf.seo_cookies?.meta_description ?? "",
      seo_image: {
        url: acf.seo_cookies?.seo_image?.url ?? "",
        alt: acf.seo_cookies?.seo_image?.alt ?? "",
      },
    },
  };
}
