"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

// Полифилл для Safari и старых браузеров
const safeRequestIdleCallback = (cb: () => void) => {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(cb);
  } else {
    setTimeout(cb, 1); // fallback
  }
};

export default function SubTitleLine({ title }: { title: string }) {
  const titleRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const trigerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !lineRef.current || !trigerRef.current) return;

    gsap.set(titleRef.current, { y: 30, opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

    safeRequestIdleCallback(() => {
      ScrollTrigger.create({
        trigger: trigerRef.current,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          });
          gsap.to(lineRef.current, {
            scaleX: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.1,
          });
        },
      });
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <div
      ref={trigerRef}
      className="w-full flex justify-between gap-[24px] py-[35px]"
    >
      {title.trim() !== "" && (
        <h4 className="w-max text-blue whitespace-nowrap">
          <span className="block overflow-hidden">
            <span ref={titleRef} className="block will-change-transform">
              {title}
            </span>
          </span>
        </h4>
      )}
      <span
        ref={lineRef}
        className="w-full h-[1px] bg-blue my-auto will-change-transform origin-right"
      ></span>
    </div>
  );
}
