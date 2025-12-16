"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../../../lib/gsap";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

export default function HeroTitleFadeIn({
  children,
  className,
  delay = 0,
}: {
  children: string;
  className: string;
  delay?: number;
}) {
  const linesRef = useRef<HTMLSpanElement[]>([]);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (!linesRef.current.length) return;

    // 🟢 MOBILE: простая анимация
    if (isMobile) {
      gsap.fromTo(
        linesRef.current[0],
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay,
          ease: "power2.out",
        }
      );
      return;
    }

    // 🔵 DESKTOP: split + stagger
    gsap.fromTo(
      linesRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay,
        stagger: 0.15,
        ease: "power3.out",
      }
    );
  }, [delay, isMobile]);

  // 👉 MOBILE: один span, нормальный перенос
  if (isMobile) {
    return (
      <h1
        lang="en"
        className={`${className} max-w-[90vw] hyphens-auto break-words`}
      >
        <span
          ref={(el) => {
            if (el) linesRef.current[0] = el;
          }}
          className="block will-change-transform"
        >
          {children.replaceAll("|", " ")}
        </span>
      </h1>
    );
  }

  // 👉 DESKTOP: split по |
  return (
    <h1 className={`${className} relative overflow-hidden`}>
      {children.split("|").map((line, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) linesRef.current[i] = el;
          }}
          className="block will-change-transform"
        >
          {line}
        </span>
      ))}
    </h1>
  );
}
