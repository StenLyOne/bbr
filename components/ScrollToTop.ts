"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import LenisProvider from "../components/LenisProvider";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0 });

    // fallback: гарантированное повторное срабатывание
    const id = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 100);

    return () => clearTimeout(id);
  }, [pathname]);

  return null;
}
