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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          toggleActions: "play reverse play reverse",
        },
      });

      // Контент появляется
      tl.fromTo(
        section.querySelector(".content"),
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
      );

      // Фон плавно появляется
      tl.to(
        bgRefs.current.map((bg, i) => ({
          element: bg,
          opacity: i === index ? 1 : 0,
        })),
        {
          opacity: (target: any) => target.opacity,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: () => {
            bgRefs.current.forEach((bg, i) => {
              bg.style.opacity = i === index ? "1" : "0";
            });
          },
        },
        "<",
      );
    });
  }, [data.content]);

  return (
    <section className="relative">
      {data.content.map((item, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) sectionRefs.current[i] = el;
          }}
          className="relative min-h-screen overflow-hidden"
        >
          {/* Локальный фон внутри секции */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              ref={(el) => {
                if (el) bgRefs.current[i] = el;
              }}
              src={item.media.image_src}
              alt={item.media.alt}
              fill
              className="object-cover opacity-0 transition-opacity duration-500"
            />
          </div>

          {/* Контент */}
          <div className="relative z-10 flex items-center justify-center h-full px-6">
            <div className="content bg-white bg-opacity-90 p-8 rounded-xl max-w-[800px] w-full text-black shadow-xl opacity-0">
              <div className="text-right text-lg font-semibold mb-4">
                {item.date}
              </div>
              {item.media.logo_src && (
                <div className="mb-4">
                  <Image
                    src={item.media.logo_src}
                    width={150}
                    height={60}
                    alt="Event Logo"
                  />
                </div>
              )}
              <p className="text-base leading-relaxed">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
