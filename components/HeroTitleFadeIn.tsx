"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function HeroTitleFadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className: string;
  delay: number
}) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!spanRef.current) return;

    gsap.fromTo(
      spanRef.current,
      { y: 90, opacity:0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: delay,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <h1 className={`${className} relative overflow-hidden`}>
      <span
        ref={spanRef}
        className="inline-block"
        style={{ display: "inline-block", willChange: "transform" }}
      >
        {children}
      </span>
    </h1>
  );
}
