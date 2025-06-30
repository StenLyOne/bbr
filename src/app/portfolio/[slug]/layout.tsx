// src/app/portfolio/[slug]/layout.tsx
import { ReactNode } from "react";
import { Metadata }  from "next";
import { fetchPortfolioItem } from "../../../../lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: any,                  // ①  uzmi ANY → tip više ne koči
): Promise<Metadata> {
  const { slug: raw } = await params;        // ②  SAČEKAJ params

  const slug =
    Array.isArray(raw) ? raw.join("/") : (raw as string);

  const { title, seo_work } = await fetchPortfolioItem(slug);
  const metaTitle = seo_work.title || title;

  return {
    title:       metaTitle,
    description: seo_work.meta_description,
    openGraph: {
      title:       metaTitle,
      description: seo_work.meta_description,
      type:        "website",
      images:      [{ url: seo_work.seo_image.url }],
    },
    twitter: {
      card:        "summary_large_image",
      title:       metaTitle,
      description: seo_work.meta_description,
      images:      [seo_work.seo_image.url],
    },
  };
}

/* čist sinhroni layout */
export default function PortfolioSlugLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
