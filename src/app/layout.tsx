import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import LenisProvider from "../../components/LenisProvider";
import ScrollToTop from "../../components/ScrollToTop";
import { fetchHomeContent } from "../../lib/api";
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
    const { seo_settings } = await fetchHomeContent();
    return {
      title: seo_settings.meta_title,
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
