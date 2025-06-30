// src/app/digital/page.tsx
import DigitalClient from "./DigitalClient";
import { fetchDigitalContent, fetchPortfolioItemsByIds } from "../../../lib/api";

export default async function DigitalPage() {
  const content     = await fetchDigitalContent();
  const latestItems = await fetchPortfolioItemsByIds(content.latest_meta.ids);

  return <DigitalClient content={content} latestItems={latestItems} />;
}
