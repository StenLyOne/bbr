import { unstable_cache } from "next/cache";
import type {  TeamContent } from "./types";
import { API_DOMAIN } from "../config";

const TEAM_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/team`;

async function fetchTeamRow(): Promise<any> {
  const res = await fetch(TEAM_URL);
  if (!res.ok) throw new Error(`our team HTTP ${res.status}`);
  return res.json();
}

const fetchTeamOptions = unstable_cache(fetchTeamRow, ["team-options"], {
  revalidate: 60,
  tags: ["team"],
});

export async function fetchTeamContent(): Promise<TeamContent> {
  const json = await fetchTeamOptions();
  const acf = json.acf ?? {}

  return {
    // HERO: uzimamo title_tm i media_tm.image_src_tm / alt_tm
    hero: {
      title: acf.hero_tm?.title_tm ?? "",
      media: {
        image_src: acf.hero_tm?.media_tm?.image_src_tm ?? "",
        alt: acf.hero_tm?.media_tm?.alt_tm ?? "",
      },
    },

    // INTRO
    intro: {
      sub_title: acf.intro?.sub_title ?? "",
      title: acf.intro?.title ?? "",
      description: acf.intro?.description ?? "",
    },

    // DEPARTMENTS
    departments: Array.isArray(acf.departments)
      ? acf.departments.map((dep: any) => ({
          title: dep.title ?? "",
          members: Array.isArray(dep.members)
            ? dep.members.map((m: any) => ({
                name: m.name ?? "",
                position: m.position ?? "",
                image_src: m.image_src ?? "",
                linkedin: m.linkedin ?? "",
              }))
            : [],
        }))
      : [],

    // CTA: pravimo ugnježdeni `button` objekat
    cta: {
      title: acf.cta?.title ?? "",
      button: {
        text: acf.cta?.button_text ?? "",
        link: acf.cta?.button_link ?? "",
      },
      background_image: acf.cta?.background_image ?? "",
    },

    // SEO
    seo: {
      meta_title: acf.seo?.meta_title ?? "",
      meta_description: acf.seo?.meta_description ?? "",
      seo_image: acf.seo?.seo_image ?? "",
    },
  };
}
