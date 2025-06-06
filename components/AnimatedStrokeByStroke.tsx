"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

interface AnimatedStrokeByStrokeProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

const safeRequestIdleCallback = (cb: () => void) => {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    (window as any).requestIdleCallback(cb);
  } else {
    setTimeout(cb, 1);
  }
};

export default function AnimatedStrokeByStroke({
  text,
  className = "",
  delay = 0,
  stagger = 0.1,
}: AnimatedStrokeByStrokeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const lines = wrapperRef.current.querySelectorAll("[data-line]");
    gsap.set(lines, { y: 60, opacity: 0 });

    let trigger: ScrollTrigger;

    safeRequestIdleCallback(() => {
      trigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top 65%",
        once: true,
        onEnter: () => {
          gsap.to(lines, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay,
            ease: "power3.out",
            stagger: 0.2,
          });
        },
      });

      ScrollTrigger.refresh();
    });

    return () => {
      trigger?.kill();
    };
  }, [delay, stagger]);

  const lineElements = text.split("|").map((line, i) => (
    <div key={i} className="overflow-hidden">
      <span data-line className="block">
        {line}
      </span>
    </div>
  ));

  return (
    <div ref={wrapperRef} className={`${className} `}>
      {lineElements}
    </div>
  );
}
