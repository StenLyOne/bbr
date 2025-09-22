import { unstable_cache } from "next/cache";
import type { DigitalContent } from "./types";
import { API_DOMAIN } from "../config";

const OUR_DIGITAL_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/digital`;

async function fetchDigitalOptionRow(): Promise<any> {
  const res = await fetch(OUR_DIGITAL_URL);
  if (!res.ok) throw new Error(`our story HTTP ${res.status}`);
  return res.json();
}

const fetchDigitalOptions = unstable_cache(
  fetchDigitalOptionRow,
  ["our-story-options"],
  {
    revalidate: false,
    tags: ["our-story"],
  }
);

export async function fetchDigitalContent(): Promise<DigitalContent> {
  const json = await fetchDigitalOptions();
  const acf = json.acf ?? {};

  const hero = {
    title: acf.hero_digital?.title ?? "",
    description: acf.hero_digital?.description ?? "",
  };

  // Communications (за видео + мали увод)
  const comm = acf.communications || {};
  const wwo = acf.what_we_offer || {}; // за title_big
  const communications = {
    sub_title: comm.sub_title ?? "",
    title: comm.title ?? "",
    title_big: wwo.title ?? "", // title_big вучемо из what_we_offer.title
    description: comm.description ?? "",
    video_src: comm.video?.url ?? "",
  };

  // Двоколона секција (MARKETING, PAID STRATEGY…)
  const two_column = Array.isArray(comm.services?.content)
    ? comm.services.content.map((item: any) => ({
        title: item.content ?? "",
        description: item.description ?? "",
        media: {
          image_src: item.media?.image?.url ?? "",
          alt: item.media?.image?.alt ?? "",
        },
      }))
    : [];

  // Главни наслов за ту секцију (“Services”)
  const two_column_title = comm.services?.title ?? "";

  // Grid секција “What We Offer”
  const what_we_offer = {
    sub_title: wwo.sub_title_ ?? "",
    title: wwo.title ?? "",
    description: wwo.description ?? "",
    content: Array.isArray(acf.what_we_offer?.content)
      ? acf.what_we_offer.content.map((item: any) => ({
          title: item.content ?? "",
          description: item.description ?? "",
          icon_src: item.media?.image?.url ?? "",
        }))
      : [],
  };

  // Latest
  const latest_meta = {
    title: acf.latest_digital?.tittle_latest ?? "",
    ids: Array.isArray(acf.latest_digital?.latest_dwork)
      ? acf.latest_digital.latest_dwork
          .map((n: unknown) => Number(n))
          .filter((n: number): n is number => !isNaN(n))
      : [],
  };

  // SEO
  const seoacf = acf.seo_digital || {};
  const seo = {
    title: seoacf.title ?? "",
    meta_description: seoacf.meta_description ?? "",
    image: {
      url: seoacf.seo_image?.url ?? "",
      alt: seoacf.seo_image?.alt ?? "",
    },
  };

  return {
    hero,
    communications,
    two_column_title,
    two_column,
    what_we_offer,
    latest_meta,
    seo,
  };
}
