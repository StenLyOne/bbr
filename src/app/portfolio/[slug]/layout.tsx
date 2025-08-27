// src/app/portfolio/[slug]/layout.tsx
import { ReactNode } from "react";
import { Metadata } from "next";
import { fetchPortfolioItem } from "../../../../lib/api/portfolio";

export default function Layout({ children }) {
  return <>{children}</>;
}
