"use client";
// hooks/useScrollRefresh.ts
import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";

export const useScrollRefresh = () => {
  useEffect(() => {
    const id = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 1000); // ждём секунду, пока всё смонтируется
    return () => clearTimeout(id);
  }, []);
};
