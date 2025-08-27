// src/app/pr/page.tsx
import PrClient from "./PrClient";
import { fetchPrContent } from "../../../lib/api/pr";
import { fetchPortfolioItemsByIds } from "../../../lib/api/portfolio";
export const REVALIDATE_SECONDS = Number(process.env.REVALIDATE ?? 600);

export const revalidate = REVALIDATE_SECONDS;

export default async function PrPage() {
  const content = await fetchPrContent();
  const latestItems = await fetchPortfolioItemsByIds(content.latest_meta.ids);
  return <PrClient content={content} latestItems={latestItems} />;
}
