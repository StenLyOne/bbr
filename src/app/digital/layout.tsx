import { ReactNode } from "react";
import { Metadata } from "next";
import { fetchDigitalContent } from "../../../lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { seo } = await fetchDigitalContent();
    return {
      title:       seo.title,
      description: seo.meta_description,
      openGraph: {
        title:       seo.title,
        description: seo.meta_description,
        type:        "website",
        images: [
          {
            url: seo.image.url,
            alt: seo.image.alt ?? "",
          },
        ],
      },
      twitter: {
        card:        "summary_large_image",
        title:       seo.title,
        description: seo.meta_description,
        images:      [seo.image.url],
      },
    };
  } catch {
    return {};
  }
}

export default function DigitalLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
