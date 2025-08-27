import type { Metadata } from "next";
import SinglePortfolioClient from "./SinglePortfolioClient";

import {
  fetchPortfolioItem,
  fetchPortfolioTeasers,
  type PortfolioItemData,
  type PortfolioTeaser,
} from "../../../../lib/api/portfolio";

export const revalidate = 2;

/** Пререндерим все страницы по имеющимся slug */
export async function generateStaticParams() {
  const list = await fetchPortfolioTeasers();
  return list.map((t) => ({ slug: t.slug }));
}

/** SEO из данных конкретной работы */
export async function generateMetadata(props: any): Promise<Metadata> {
  const { slug } = await props.params;
  try {
    const data = await fetchPortfolioItem(slug);
    const img = data.seo_work.seo_image.url;

    return {
      title: data.seo_work.title || data.title,
      description: data.seo_work.meta_description,
      openGraph: {
        title: data.seo_work.title || data.title,
        description: data.seo_work.meta_description,
        type: "website",
        images: img ? [{ url: img, alt: data.title }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: data.seo_work.title || data.title,
        description: data.seo_work.meta_description,
        images: img ? [img] : [],
      },
    };
  } catch {
    return {};
  }
}

/** Страница: данные по конкретной работе */
export default async function Page(props: any) {
  // <-- ВАЖНО: дождаться params
  const { slug } = await props.params;

  const work: PortfolioItemData = await fetchPortfolioItem(slug);
  const allTeasers: PortfolioTeaser[] = await fetchPortfolioTeasers();
  const teasers = allTeasers.filter((t) => t.slug !== slug);

  return <SinglePortfolioClient work={work} teasers={teasers} />;
}
