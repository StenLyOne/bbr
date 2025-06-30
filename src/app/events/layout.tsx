// src/app/events/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";
import { fetchEventPageContent } from "../../../lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { seo } = await fetchEventPageContent();
    return {
      title:       seo.meta_title,
      description: seo.meta_description,
      openGraph: {
        title:       seo.meta_title,
        description: seo.meta_description,
        type:        "website",
        images: [
          {
            url: seo.social_image.url,
            alt: seo.social_image.alt,
          },
        ],
      },
      twitter: {
        card:        "summary_large_image",
        title:       seo.meta_title,
        description: seo.meta_description,
        images:      [seo.social_image.url],
      },
    };
  } catch {
    return {};
  }
}

type EventsLayoutProps = {
  children: ReactNode;
};

export default function EventsLayout({ children }: EventsLayoutProps) {
  return <>{children}</>;
}
