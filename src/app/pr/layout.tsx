// src/app/pr/layout.tsx
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { fetchPrContent } from '../../../lib/api/pr';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { seo } = await fetchPrContent();
    return {
      title:       seo.title,
      description: seo.meta_description,
      openGraph: {
        title:       seo.title,
        description: seo.meta_description,
        type:        'website',
        images: [
          {
            url:  seo.image.url,
            alt:  seo.image.alt,
          },
        ],
      },
      twitter: {
        card:        'summary_large_image',
        title:       seo.title,
        description: seo.meta_description,
        images:      [seo.image.url],
      },
    };
  } catch {
    return {};
  }
}

export default function PRLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
