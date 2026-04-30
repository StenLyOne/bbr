"use client";

import SubTitleLine from "../ui/typography/SubTitleLine";
import { useEffect } from "react";
import { gsap } from "../../lib/gsap";

export default function Partners({ data }: { data: any }) {
  const logos = data.logos;

  const third = Math.ceil(logos.length / 3);

  const chunkedLogos = [
    logos.slice(0, third),
    logos.slice(third, third * 2),
    logos.slice(third * 2),
  ];

  useEffect(() => {
    const DURATION = 150;
    const MOBILE_SPEED_MULTIPLIER = 2;
    const rows = gsap.utils.toArray<HTMLElement>(".logo-row");
    const imageListenersCleanup: Array<() => void> = [];
    const tweens: gsap.core.Tween[] = [];
    let rafId: number | null = null;

    const killTweens = () => {
      tweens.forEach((tween) => tween.kill());
      tweens.length = 0;
    };

    const init = () => {
      killTweens();

      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const speedMultiplier = isMobile ? MOBILE_SPEED_MULTIPLIER : 1;

      rows.forEach((row) => {
        const direction = Number(row.dataset.direction) || 1;
        const fullSetWidth = row.scrollWidth / 4;
        if (!fullSetWidth) return;

        const distance = fullSetWidth * speedMultiplier;
        const fromX = direction === 1 ? 0 : -distance;
        const toX = direction === 1 ? -distance : 0;

        tweens.push(
          gsap.fromTo(
            row,
            { x: fromX },
            {
              x: toX,
              repeat: -1,
              ease: "none",
              duration: DURATION,
              force3D: true,
              overwrite: true,
            }
          )
        );
      });
    };

    const scheduleInit = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        init();
        rafId = null;
      });
    };

    scheduleInit();
    window.addEventListener("resize", scheduleInit);

    rows.forEach((row) => {
      const images = Array.from(row.querySelectorAll("img"));
      images.forEach((img) => {
        if (img.complete) return;

        const onLoad = () => scheduleInit();
        img.addEventListener("load", onLoad);
        img.addEventListener("error", onLoad);

        imageListenersCleanup.push(() => {
          img.removeEventListener("load", onLoad);
          img.removeEventListener("error", onLoad);
        });
      });
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", scheduleInit);
      imageListenersCleanup.forEach((fn) => fn());
      killTweens();
    };
  }, []);

  return (
    <section className=" bg-white overflow-hidden">
      <div className="px-[16px] md:px-[40px]">
        <SubTitleLine title={data.sub_title} />

        <div className="space-y-[90px] md:space-y-[58px] mt-[33px] md:mt-[58px] mb-[90px] md:mb-[87px]">
          {chunkedLogos.map((logoRow: string[], rowIndex: number) => (
            <div
              key={rowIndex}
              className="logo-row flex whitespace-nowrap gap-[52.5px] md:gap-[70px] will-change-transform [transform:translate3d(0,0,0)]"
              data-direction={rowIndex % 2 === 0 ? 1 : -1}
            >
              {[...logoRow, ...logoRow, ...logoRow, ...logoRow].map(
                (logo, index) => (
                  <div
                    key={`${rowIndex}-${index}`}
                    className="flex-shrink-0 h-[95px]"
                  >
                    <img
                      src={logo}
                      alt={`logo-${rowIndex}-${index}`}
                      height={95}
                      loading="lazy"
                      decoding="async"
                      className="block h-[95px] max-h-[95px] w-auto max-w-none object-contain [transform:translate3d(0,0,0)]"
                    />
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
