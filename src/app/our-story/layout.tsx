// src/app/our-story/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";
import { fetchOurStoryContent } from "../../../lib/api/story";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { seo_our_story } = await fetchOurStoryContent();
    const imageUrl = seo_our_story.social_image.url;
    const imageAlt = seo_our_story.social_image.alt;

    return {
      title:       seo_our_story.title,
      description: seo_our_story.meta_description,
      openGraph: {
        title:       seo_our_story.title,
        description: seo_our_story.meta_description,
        type:        "website",
        images: [
          {
            url:  imageUrl,
            alt:  imageAlt,
          },
        ],
      },
      twitter: {
        card:        "summary_large_image",
        title:       seo_our_story.title,
        description: seo_our_story.meta_description,
        images:      [imageUrl],
      },
    };
  } catch {
    return {};
  }
}

type OurStoryLayoutProps = {
  children: ReactNode;
};

export default function OurStoryLayout({ children }: OurStoryLayoutProps) {
  return <>{children}</>;
}
