import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "../../lib/gsap";

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  date: string;
  description: string;
  media: {
    image_src: string;
    logo_src?: string;
    alt: string;
  };
}

export default function TimelineSection({
  data,
}: {
  data: { content: TimelineItem[] };
}) {
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const bgRefs = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      const image = bgRefs.current[index];
      const content = section.querySelector(".content");

      if (!image || !content) return;

      // Параллакс на фон
      gsap.to(image, {
        y: "20%", // было 10%
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Появление контента
      gsap.fromTo(
        content,
        { autoAlpha: 1, y: 0 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, [data.content]);

  return (
    <div className="relative">
      {data.content.map((item, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) sectionRefs.current[i] = el;
          }}
          className="relative min-h-screen overflow-hidden"
        >
          {/* Локальный фон внутри секции */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              ref={(el) => {
                if (el) bgRefs.current[i] = el;
              }}
              src={item.media.image_src}
              alt={item.media.alt}
              fill
              className="object-cover parallax-bg scale-[1.2]"
            />
          </div>

          <div className="relative z-10 h-screen flex items-center justify-center px-6">
            <div className="relative  h-full flex items-center max-w-[1000px] w-full">
              {/* Дата + точка */}
              <div className="hidden md:block">
                <p className="w-[200px] max-w-[200px] text-white !font-[900] text-right large whitespace-nowrap -translate-x-[120px]">
                  {item.date.split(" ")[0]}
                  <br />
                  {item.date.split(" ")[1]}
                </p>

                {/* Палочка + точка */}
                <div className="absolute left-[120px] top-0 w-[3px] h-full bg-blank z-20">
                  {/* Точка по центру линии */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-4 border-white/50 z-10" />
                </div>

                {/* Дата слева */}
                {/* <div className="w-[200px] pr-[90px] flex items-center relative">
                
              </div> */}
              </div>

              {/* Карточка */}
              <div className="content bg-white space-y-[60px] p-[24px] md:p-[52px] max-w-[787px] w-full md:h-[366px]">
                {item.media.logo_src && (
                  <div className="mb-4">
                    <Image
                      src={item.media.logo_src}
                      width={150}
                      height={60}
                      alt="Event Logo"
                      className="mx-auto"
                    />
                  </div>
                )}
                <div className="space-y-[18px]">
                  <h3 className="text-center text-blue">{item.date}</h3>
                  <p className="text-blue text-center md:text-left">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
