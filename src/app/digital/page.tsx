// src/app/digital/page.tsx
import DigitalClient from "./DigitalClient";
import { fetchDigitalContent } from "../../../lib/api/digital";

import { fetchPortfolioItemsByIds } from "../../../lib/api/portfolio";

import { DEFAULT_REVALIDATE } from "../../../lib/api/config";

export const revalidate = DEFAULT_REVALIDATE;

export default async function DigitalPage() {
  const content = await fetchDigitalContent();
  const latestItems = await fetchPortfolioItemsByIds(content.latest_meta.ids);
  return <DigitalClient content={content} latestItems={latestItems} />;
}
