// src/app/portfolio/page.tsx
import PortfolioClient from "./PortfolioClient";
import { fetchPortfolioSettings, fetchPortfolioItems } from "../../../lib/api";

export default async function PortfolioPage() {
  const settings = await fetchPortfolioSettings();
  const works     = await fetchPortfolioItems();
  return <PortfolioClient settings={settings} works={works} />;
}
