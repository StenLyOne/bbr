import { unstable_cache } from "next/cache";
import type { DigitalContent } from "./types";
import { API_DOMAIN } from "../config";

const OUR_DIGITAL_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/digital`;

async function fetchDigitalOptionRow(): Promise<any> {
  const res = await fetch(OUR_DIGITAL_URL);
  if (!res.ok) throw new Error(`digital HTTP ${res.status}`);
  return res.json();
}

const fetchDigitalOptions = unstable_cache(
  fetchDigitalOptionRow,
  ["digital-options"],
  {
    revalidate: 60,
    tags: ["digital"],
  }
);

export async function fetchDigitalContent(): Promise<DigitalContent> {
  const json = await fetchDigitalOptions();
  const acf = json.acf ?? {};

  const normalizeCommunicationStat = (item: any) => {
    const rawLabel = String(item?.label ?? "").trim();
    const rawValue = String(item?.value ?? "").trim();
    const hasDigitsInLabel = /\d/.test(rawLabel);
    const hasDigitsInValue = /\d/.test(rawValue);

    if (hasDigitsInLabel && !hasDigitsInValue) {
      return { label: rawValue, value: rawLabel };
    }

    if (hasDigitsInValue && !hasDigitsInLabel) {
      return { label: rawLabel, value: rawValue };
    }

    return {
      label: rawLabel,
      value: rawValue,
    };
  };

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
    image: {
      src:
        comm.image?.url ??
        comm.image?.image?.url ??
        comm.media?.image?.url ??
        (typeof comm.image === "string" ? comm.image : ""),
      alt:
        comm.image?.alt ??
        comm.image?.image?.alt ??
        comm.media?.image?.alt ??
        comm.title ??
        "",
    },
    stats: Array.isArray(comm.stats)
      ? comm.stats
          .map((item: any) => normalizeCommunicationStat(item))
          .filter((item: { label: string; value: string }) => item.value || item.label)
      : [],
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
    social_media: Array.isArray(wwo.social_media)
      ? wwo.social_media
          .map((item: any) => ({
            icon_src:
              item?.icon?.url ??
              item?.icon?.image?.url ??
              (typeof item?.icon === "string" ? item.icon : ""),
            url:
              item?.url?.url ??
              (typeof item?.url === "string" ? item.url : ""),
            alt:
              item?.icon?.alt ??
              item?.label ??
              "",
          }))
          .filter((item: { icon_src: string; url: string }) => item.icon_src && item.url)
      : [],
    content: Array.isArray(acf.what_we_offer?.content)
      ? acf.what_we_offer.content.map((item: any) => ({
          title: item.content ?? "",
          description: item.description ?? "",
          icon_src: item.media?.image?.url ?? "",
        }))
      : [],
  };

  const cta = {
    title: acf.cta_digital?.title ?? "",
    description: acf.cta_digital?.description ?? "",
  };

  const testimonial = {
    sub_title: acf.testimonial_digital?.sub_title ?? "",
    title: acf.testimonial_digital?.title ?? "",
    testimonials: Array.isArray(acf.testimonial_digital?.testimonials_digital)
      ? acf.testimonial_digital.testimonials_digital.map((item: any) => ({
          description: item?.description ?? "",
          name: item?.name ?? "",
          job: item?.job ?? "",
          company: item?.company ?? "",
          logo_src:
            item?.logo?.url ??
            item?.media?.url ??
            "",
        }))
      : [],
  };

  const our_client_network = {
    sub_title: acf.our_client_network?.sub_title ?? "",
    gallery: Array.isArray(acf.our_client_network?.gallery)
      ? acf.our_client_network.gallery.map((img: any) =>
          typeof img === "string" ? img : img?.url ?? ""
        )
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
    cta,
    testimonial,
    our_client_network,
    latest_meta,
    seo,
  };
}
