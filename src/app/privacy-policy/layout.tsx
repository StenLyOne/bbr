// src/app/privacy-policy/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";
import { fetchPrivacyContent } from "../../../lib/api/privacy";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { seo_privacy } = await fetchPrivacyContent();
    const { tittle, meta_description, seo_image } = seo_privacy;

    return {
      title: tittle,
      description: meta_description,
      openGraph: {
        title: tittle,
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
        title: tittle,
        description: meta_description,
        images: [seo_image.url],
      },
    };
  } catch {
    return {};
  }
}

type PrivacyLayoutProps = {
  children: ReactNode;
};

export default function PrivacyLayout({ children }: PrivacyLayoutProps) {
  return <>{children}</>;
}
