// src/app/our-owned-events/layout.tsx

import { ReactNode } from 'react';
import { Metadata } from 'next';
import { fetchOwnedEventSettings } from '../../../lib/api/events';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { seo } = await fetchOwnedEventSettings();
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

export default function OwnedEventsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
