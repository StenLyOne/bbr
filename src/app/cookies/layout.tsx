// src/app/cookies/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";
import { fetchCookiesContent } from "../../../lib/api/cookies";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { seo_cookies } = await fetchCookiesContent();
    const { title, meta_description, seo_image } = seo_cookies;

    return {
      title,
      description: meta_description,
      openGraph: {
        title,
        description: meta_description,
        type: "website",
        images: [
          {
            url: seo_image.url,
            alt: seo_image.alt,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: meta_description,
        images: [seo_image.url],
      },
    };
  } catch {
    return {};
  }
}

type CookiesLayoutProps = {
  children: ReactNode;
};

export default function CookiesLayout({ children }: CookiesLayoutProps) {
  return <>{children}</>;
}
