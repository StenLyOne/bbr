"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

interface AnimatedTextWordByWordProps {
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

export default function AnimatedTextWordByWord({
  text,
  className = "",
  delay = 0,
  stagger = 0.1,
}: AnimatedTextWordByWordProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const words = wrapperRef.current.querySelectorAll("[data-word]");
    gsap.set(words, { y: 60, opacity: 0 });

    let trigger: ScrollTrigger;

    safeRequestIdleCallback(() => {
      trigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top 65%",
        once: true,
        onEnter: () => {
          gsap.to(words, {
            y: 0,
            opacity: 1,
            duration: 1,
            delay,
            ease: "power3.out",
            stagger,
          });
        },
      });

      ScrollTrigger.refresh();
    });

    return () => {
      trigger?.kill();
    };
  }, [delay, stagger]);

  const wordElements = text.split(" ").map((word, i) => (
    <span key={i} data-word className="inline-block overflow-hidden mr-[0.3em]">
      <span className="inline-block">{word}</span>
    </span>
  ));

  return (
    <div ref={wrapperRef} className={`inline-block ${className}`}>
      {wordElements}
    </div>
  );
}
