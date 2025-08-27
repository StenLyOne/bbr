// src/app/digital/page.tsx
import DigitalClient from "./DigitalClient";
import { fetchDigitalContent } from "../../../lib/api/digital";

import { fetchPortfolioItemsByIds } from "../../../lib/api/portfolio";

export const revalidate = 2;

export default async function DigitalPage() {
  const content = await fetchDigitalContent();
  const latestItems = await fetchPortfolioItemsByIds(content.latest_meta.ids);
  return <DigitalClient content={content} latestItems={latestItems} />;
}
