// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import LenisProvider from "../../components/LenisProvider";
import ScrollToTop from "../../components/ScrollToTop";
import { fetchHomeContent, fetchSiteLogos } from "../../lib/api";   // ← dodato fetchSiteLogos
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    /* povlačimo paralelno SEO i favicon */
    const [{ seo_settings }, { favicon }] = await Promise.all([
      fetchHomeContent(),
      fetchSiteLogos(),
    ]);

    return {
      title:       seo_settings.meta_title,
      description: seo_settings.meta_description,
      openGraph: {
        title:       seo_settings.meta_title,
        description: seo_settings.meta_description,
        images:      seo_settings.social_image.url,
        type:        "website",
      },
      twitter: {
        card:        "summary_large_image",
        title:       seo_settings.meta_title,
        description: seo_settings.meta_description,
        images:      [seo_settings.social_image.url],
      },
      /* globalni favicon iz WP‑a */
      icons: {
        icon: [
          { url: favicon,             rel: "icon" },
          { url: favicon,             rel: "shortcut icon" },
          { url: favicon,             rel: "apple-touch-icon" },
        ],
      },
    };
  } catch {
    return {};
  }
}

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ScrollToTop />
        {/* <LenisProvider /> */}
        {children}
      </body>
    </html>
  );
}
