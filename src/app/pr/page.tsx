// src/app/pr/page.tsx
import PrClient from "./PrClient";
import { fetchPrContent } from "../../../lib/api/pr";
import { fetchPortfolioItemsByIds } from "../../../lib/api/portfolio";
import { DEFAULT_REVALIDATE } from "../../../lib/api/config";

export const revalidate = DEFAULT_REVALIDATE;

export default async function PrPage() {
  const content = await fetchPrContent();
  const latestItems = await fetchPortfolioItemsByIds(content.latest_meta.ids);
  return <PrClient content={content} latestItems={latestItems} />;
}
