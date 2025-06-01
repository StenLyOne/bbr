"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

interface AnimatedTextLinesProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}

export default function AnimatedTextLines({
  children,
  stagger = 0.1,
  className = "", // не забудь дефолт
}: AnimatedTextLinesProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const lines = wrapperRef.current.querySelectorAll("[data-line]");
    gsap.set(lines, { y: 60, opacity: 0 });

    let trigger: ScrollTrigger;

    if (typeof window !== "undefined") {
      window.requestIdleCallback(() => {
        trigger = ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: "top 65%",
          toggleActions: "play none none none",
          once: true,
          onEnter: () => {
            gsap.to(lines, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              stagger,
            });
          },
        });
        ScrollTrigger.refresh();
      });
    }

    return () => {
      trigger?.kill();
    };
  }, [stagger]);

  return (
    <div
      ref={wrapperRef}
      className={`overflow-hidden w-full ${className}`}
    >
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <div key={i} data-line className="overflow-hidden w-full">
            {child}
          </div>
        ))
      ) : (
        <div data-line className="overflow-hidden ">
          {children}
        </div>
      )}
    </div>
  );
}

