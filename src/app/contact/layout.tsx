// src/app/contact/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";
import { fetchContactContent } from "../../../lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    // fetch only the SEO group, not the hero image
    const { seo_contact } = await fetchContactContent();

    return {
      title:       seo_contact.title,
      description: seo_contact.meta_description,

      openGraph: {
        title:       seo_contact.title,
        description: seo_contact.meta_description,
        type:        "website",
        images: [
          {
            url:  seo_contact.seo_image.url,
            alt:  seo_contact.seo_image.alt,
          },
        ],
      },

      twitter: {
        card:        "summary_large_image",
        title:       seo_contact.title,
        description: seo_contact.meta_description,
        images:      [seo_contact.seo_image.url],
      },
    };
  } catch {
    // on fetch error just return empty metadata
    return {};
  }
}

type ContactLayoutProps = {
  children: ReactNode;
};

export default function ContactLayout({ children }: ContactLayoutProps) {
  return <>{children}</>;
}
