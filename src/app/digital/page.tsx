// src/app/digital/page.tsx
import DigitalClient from "./DigitalClient";
import { fetchDigitalContent } from "../../../lib/api/digital";

import { fetchPortfolioItemsByIds } from "../../../lib/api/portfolio";

export const REVALIDATE_SECONDS = Number(process.env.REVALIDATE ?? 600);

export const revalidate = REVALIDATE_SECONDS;

export default async function DigitalPage() {
  const content = await fetchDigitalContent();
  const latestItems = await fetchPortfolioItemsByIds(content.latest_meta.ids);
  return <DigitalClient content={content} latestItems={latestItems} />;
}
