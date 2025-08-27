// src/app/pr/page.tsx
import PrClient from "./PrClient";
import { fetchPrContent } from "../../../lib/api/pr";
import { fetchPortfolioItemsByIds } from "../../../lib/api/portfolio";

export const revalidate = 2;

export default async function PrPage() {
  const content = await fetchPrContent();
  const latestItems = await fetchPortfolioItemsByIds(content.latest_meta.ids);
  return <PrClient content={content} latestItems={latestItems} />;
}
