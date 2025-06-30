// src/app/pr/page.tsx
import PrClient from "./PrClient";
import { fetchPrContent, fetchPortfolioItemsByIds } from "../../../lib/api";

export const dynamic = "force-dynamic";

export default async function PrPage() {
  const content     = await fetchPrContent();
  const latestItems = await fetchPortfolioItemsByIds(content.latest_meta.ids);
  return <PrClient content={content} latestItems={latestItems} />;
}
