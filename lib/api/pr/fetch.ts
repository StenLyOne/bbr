import { unstable_cache } from "next/cache";
import { PrContent } from "./types";
import { API_DOMAIN } from "../config";

const PR_CONTENT_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/prservices`;

export async function fetchPrOptionRaw(): Promise<any> {
  const res = await fetch(PR_CONTENT_URL);
  if (!res.ok) throw new Error(`pr HTTP error: ${res.status}`);
  return res.json();
}

const fetchPrOption = unstable_cache(fetchPrOptionRaw, ["pr-options"], {
  revalidate: 60,
  tags: ["pr"],
});

export async function fetchPrContent(): Promise<PrContent> {
  const json = await fetchPrOption();
  const acf = json.acf ?? "";
  const hero = {
    title: acf.hero_pr?.title ?? "",
    description: acf.hero_pr?.description ?? "",
    video_src: acf.hero_pr?.video?.url ?? "",
  };

  // Where We Started
  const wws = acf.where_we_started || {};
  const where_we_started = {
    sub_title: wws.sub_title ?? "",
    title: wws.title ?? "",
    content: Array.isArray(wws.content)
      ? wws.content.map((item: any) => ({
          title: item.title ?? "",
          description: (item.description ?? "")
            .split(/\r?\n/)
            .filter((s: string) => s.trim().length > 0),
          media: {
            image_src: item.media?.image?.url ?? "",
            alt: item.media?.image?.alt ?? "",
          },
        }))
      : [],
  };

  // Services
  const srv = acf.services_pr || {};
  const services = {
    sub_title: srv.sub_title ?? "",
    title: srv.title ?? "",
    content: Array.isArray(srv.content)
      ? srv.content.map((item: any) => ({
          title: item.title ?? "",
          description: item.description ?? "",
          media: {
            image_src: item.media?.image?.url ?? "",
            alt: item.media?.image?.alt ?? "",
          },
        }))
      : [],
  };

  // Featured On
  const feat = acf.featured_on || {};
  const featured_on = {
    sub_title: feat.sub_title ?? "",
    gallery: Array.isArray(feat.gallery)
      ? feat.gallery.map((img: any) =>
          typeof img === "string" ? img : img.url
        )
      : [],
  };

  // Latest IDs
  const latest_meta = {
    title: acf.latest_pr?.tittle ?? "",
    ids: Array.isArray(acf.latest_pr?.latest_prr)
      ? (() => {
          console.log("raw latest_prr:", acf.latest_pr); // что приходит напрямую

          const numbers = acf.latest_pr.latest_prr.map((v: unknown): number =>
            Number(v)
          );
          console.log("after map → Number:", numbers); // массив чисел (может содержать NaN)

          const filtered = numbers.filter(
            (n: number): n is number => !isNaN(n)
          );
          console.log("after filter → no NaN:", filtered); // массив только валидных чисел

          return filtered;
        })()
      : [],
  };

  // SEO
  const seo = {
    title: acf.seo_pr?.title ?? "",
    meta_description: acf.seo_pr?.meta_description ?? "",
    image: {
      url:
        typeof acf.seo_pr?.seo_image === "string"
          ? acf.seo_pr.seo_image
          : acf.seo_pr?.seo_image?.url ?? "",
      alt: acf.seo_pr?.seo_image?.alt ?? "",
    },
  };

  return { hero, where_we_started, services, featured_on, latest_meta, seo };
}
