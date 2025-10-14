// src/app/portfolio/page.tsx
import PortfolioClient from "./PortfolioClient";
import { fetchPortfolioContent } from "../../../lib/api/portfolio";
import { fetchPortfolioItems } from "../../../lib/api/portfolio";

export const revalidate = 60;

export default async function PortfolioPage() {
  const settings = await fetchPortfolioContent();
  const works = await fetchPortfolioItems();
  return <PortfolioClient settings={settings} works={works} />;
}
