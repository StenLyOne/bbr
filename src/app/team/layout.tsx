import { ReactNode } from "react";
import { Metadata } from "next";
import { fetchTeamContent } from "../../../lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { seo } = await fetchTeamContent();
    const imageUrl = seo.seo_image;
    return {
      title:       seo.meta_title,
      description: seo.meta_description,
      openGraph: {
        title:       seo.meta_title,
        description: seo.meta_description,
        type:        "website",
        images: [
          {
            url:  imageUrl,
            alt:  seo.meta_title,
          },
        ],
      },
      twitter: {
        card:        "summary_large_image",
        title:       seo.meta_title,
        description: seo.meta_description,
        images:      [imageUrl],
      },
    };
  } catch {
    return {};
  }
}

type TeamLayoutProps = {
  children: ReactNode;
};

export default function TeamLayout({ children }: TeamLayoutProps) {
  return <>{children}</>;
}
