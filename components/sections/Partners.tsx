"use client";

import SubTitleLine from "../ui/SubTitleLine";
import { useEffect } from "react";
import { gsap } from "../../lib/gsap";

export default function Partners({ data }: { data: any }) {
  const logos = data.logos;

  // разбиваем на 3 группы
  const chunkedLogos = [
    logos.slice(0, logos.length / 3),
    logos.slice(logos.length / 3, (logos.length * 2) / 3),
    logos.slice((logos.length * 2) / 3),
  ];

  useEffect(() => {
    const rows = gsap.utils.toArray<HTMLElement>(".logo-row");

    rows.forEach((row) => {
      const direction = Number(row.dataset.direction) || 1;

      gsap.to(row, {
        xPercent: direction * -50,
        repeat: -1,
        ease: "none",
        duration: 30,
        modifiers: {
          xPercent: gsap.utils.wrap(-100, 0),
        },
      });
    });
  }, []);

  return (
    <section className=" bg-white overflow-hidden">
      <div className="px-[16px] md:px-[40px]">
        <SubTitleLine title={data.sub_title} />

        <div className="space-y-[90px] md:space-y-[58px] mt-[33px] md:mt-[58px] mb-[90px] md:mb-[87px]">
          {chunkedLogos.map((logoRow: string[], rowIndex: number) => (
            <div
              key={rowIndex}
              className="logo-row flex whitespace-nowrap gap-[52.5px] md:gap-[70px] will-change-transform"
              data-direction={rowIndex % 2 === 0 ? 1 : -1}
            >
              {[...logoRow, ...logoRow, ...logoRow, ...logoRow].map(
                (logo, index) => (
                  <div key={`${rowIndex}-${index}`} className="flex-shrink-0 h-[95px]">
                    <img
                      src={logo}
                      alt={`logo-${rowIndex}-${index}`}
                      className="h-auto w-auto max-h-[95px] max-w-none"
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
