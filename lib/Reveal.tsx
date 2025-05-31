"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

export default function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // когда 15% вьюпорта снизу
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return <div ref={ref}>{children}</div>;
}
