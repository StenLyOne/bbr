// src/app/our-owned-events/[slug]/layout.tsx
import { ReactNode } from "react";
import { Metadata }  from "next";
import { fetchOwnedEventItem } from "../../../../lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: any
): Promise<Metadata> {
  /* ①  najpre sačekaj proxy objekat */
  const { slug: raw } = await params;

  /* ②  normalizuj kad je [...slug] */
  const slug =
    Array.isArray(raw) ? raw.join("/") : (raw as string);

  /* ③  povuci SEO podatke */
  const { title, seo_owned_event } = await fetchOwnedEventItem(slug);
  const metaTitle = seo_owned_event.title || title;

  return {
    title:       metaTitle,
    description: seo_owned_event.meta_description,
    openGraph: {
      title:       metaTitle,
      description: seo_owned_event.meta_description,
      type:        "website",
      images:      [{ url: seo_owned_event.seo_image.url }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       metaTitle,
      description: seo_owned_event.meta_description,
      images:      [seo_owned_event.seo_image.url],
    },
  };
}

export default function OwnedEventSlugLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
