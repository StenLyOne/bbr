"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";

interface AnimatedTextLinesProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
  delay?: number;
  width?: string;
}

export default function AnimatedTextLines({
  children,
  stagger = 0.1,
  className = "",
  delay = 0,
  width = "",
}: AnimatedTextLinesProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const init = () => {
      if (!wrapperRef.current) return;
      const lines = wrapperRef.current.querySelectorAll("[data-line]");
      gsap.set(lines, { y: 60, opacity: 0 });

      const trigger = ScrollTrigger.create({
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
            stagger,
          });
        },
      });
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") init();
    else window.addEventListener("load", init);

    return () => window.removeEventListener("load", init);
  }, [stagger, delay]);

  return (
    <div ref={wrapperRef} className={`overflow-hidden w-full ${className}`}>
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <div key={i} data-line className={` w-${width}`}>
            {child}
          </div>
        ))
      ) : (
        <div data-line className="overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
}
