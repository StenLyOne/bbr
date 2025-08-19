"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../../../lib/gsap";

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

  useEffect(() => {
    if (!linesRef.current.length) return;

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
  }, []);

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
