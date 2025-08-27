// src/app/portfolio/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";
import { fetchPortfolioContent } from "../../../lib/api/portfolio";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { seo } = await fetchPortfolioContent();
    return {
      title:       seo.title,
      description: seo.meta_description,
      openGraph: {
        title:       seo.title,
        description: seo.meta_description,
        type:        "website",
        images: [{ url: seo.image }],
      },
      twitter: {
        card:        "summary_large_image",
        title:       seo.title,
        description: seo.meta_description,
        images:      [seo.image],
      },
    };
  } catch {
    return {};
  }
}

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
