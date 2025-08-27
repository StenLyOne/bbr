// components/sections/Footer/index.tsx
"use client";

import type { ContactSettings } from "../../../lib/api/contacts/types";
import { useContactSettings } from "../../../hooks/useContactSettings";
import FooterClient from "./FooterClient";

type Props = {
  color?: "black" | "rouge" | string;
  settings?: ContactSettings | null;
};

export default function Footer({ color, settings = null }: Props) {
  const { status, data, error } = useContactSettings(settings);

  if (status === "loading") {
    // временно покажем заглушку — чтобы увидеть, что компонент реально монтируется
    return <div style={{ height: 1 }} />; // или null
  }
  if (status === "error") {
    console.error("[Footer] contact settings load failed:", error);
    return null;
  }

  return <FooterClient color={color} settings={data} />;
}
