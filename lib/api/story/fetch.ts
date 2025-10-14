import { unstable_cache } from "next/cache";
import type { OurStoryData } from "./types";
import { API_DOMAIN } from "../config";

const OUR_STORY_URL = `${API_DOMAIN}/wp-json/bbr/v1/options/our-story`;

async function fetchOurStoryRow(): Promise<any  > {
  const res = await fetch(OUR_STORY_URL);
  if (!res.ok) throw new Error(`our story HTTP ${res.status}`);
  return res.json();
}

const fetchOurStoryOptions = unstable_cache(
  fetchOurStoryRow,
  ["our-story-options"],
  {
    revalidate: 60,
    tags: ["our-story"],
  }
);

export async function fetchOurStoryContent(): Promise<OurStoryData> {
  const json = await fetchOurStoryOptions();
  const acf = json.acf ?? {}

  return {
    hero: {
      title: acf["hero-os"]?.["title-os"] ?? "",
      description: acf["hero-os"]?.["description-os"] ?? "",
    },

    what_we_do: {
      sub_title: acf.what_we_do?.sub_title ?? "",
      title: acf.what_we_do?.title ?? "",
      description: acf.what_we_do?.description ?? "",
      media: {
        image_src: acf.what_we_do?.media?.image?.url ?? "",
        alt: acf.what_we_do?.media?.image?.alt ?? "",
      },
    },

    where_we_started: {
      sub_title: acf.where_we_started_our_story?.sub_title ?? "",
      content: (acf.where_we_started_our_story?.content ?? []).map(
        (item: any) => ({
          title: item.title ?? "",
          description: Array.isArray(item.description)
            ? item.description
            : [item.description ?? ""],
          media: {
            image_src: item.media?.image?.url ?? "",
            alt: item.media?.image?.alt ?? "",
          },
        })
      ),
    },

    timeline: {
      sub_title: acf.timeline?.sub_title ?? "",
      title: acf.timeline?.title ?? "",
      content: (acf.timeline?.content ?? []).map((item: any) => ({
        date: item.date ?? "",
        description: item.description ?? "",
        media: {
          image_src: item.media?.image?.url ?? "",
          alt: item.media?.image?.alt ?? "",
          /* ➊ uzmi logo sa “timetable_logo”; ako nema, probaj media.logo */
          logo_src: item.timetable_logo ?? item.media?.logo?.url ?? "",
        },
      })),
    },

    testimonial: {
      sub_title: acf.testimonial?.sub_title ?? "",
      title: acf.testimonial?.title ?? "",
      testimonials: (acf.testimonial?.testimonials ?? []).map((item: any) => ({
        description: item.description ?? "",
        name: item.name ?? "",
        job: item.job ?? "",
        company: item.company ?? "",
        logo_src: item.media?.url ?? "",
      })),
    },

    // Овде смо додали SEO поља
    seo_our_story: {
      title: acf.seo_our_story?.title ?? "",
      meta_description: acf.seo_our_story?.meta_description ?? "",
      social_image: {
        // АCF ти вероватно враћа само стринг у seo_image, па га узимаш директно
        url:
          typeof acf.seo_our_story?.seo_image === "string"
            ? acf.seo_our_story.seo_image
            : acf.seo_our_story?.seo_image?.url ?? "",
        // Ако имаш посебно alt поље, узмеш га, иначе оставиш празан
        alt: acf.seo_our_story?.seo_image?.alt ?? "",
      },
    },
  };
}
