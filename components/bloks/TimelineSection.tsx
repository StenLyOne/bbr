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
    // 👇 ЯВНОЕ НАЧАЛЬНОЕ СОСТОЯНИЕ
    bgRefs.current.forEach((img, i) => {
      gsap.set(img, { opacity: i === 0 ? 1 : 0 });
    });

    sectionRefs.current.forEach((section, index) => {
      const image = bgRefs.current[index];
      if (!image) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          bgRefs.current.forEach((img, i) =>
            gsap.to(img, {
              opacity: i === index ? 1 : 0,
              duration: 0.4,
              overwrite: "auto",
            })
          );
        },
        onEnterBack: () => {
          bgRefs.current.forEach((img, i) =>
            gsap.to(img, {
              opacity: i === index ? 1 : 0,
              duration: 0.4,
              overwrite: "auto",
            })
          );
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [data.content]);

  return (
    <div className="relative flex flex-col ">
      <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        {data.content.map((item, i) => (
          <Image
            key={i}
            ref={(el) => {
              if (el) bgRefs.current[i] = el;
            }}
            src={item.media.image_src}
            alt={item.media.alt}
            fill
            className="absolute inset-0 object-cover scale-[1.2] opacity-0"
          />
        ))}
      </div>

      {data.content.map((item, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) sectionRefs.current[i] = el;
          }}
          className={`relative overflow-hidden ${i === 0 ? "mt-[-95vh] md:mt-[-100vh]" : ""}`}
        >
          {/* Локальный фон внутри секции */}

          <div className="relative z-10 max-[768px]:gap-40 h-full md:h-[70vh] flex items-center justify-center px-6">
            <div className="relative h-full md:h-[70vh] flex items-center max-w-[1000px] w-full">
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
              <div className="content bg-white space-y-[60px] p-[24px] md:p-[52px] max-w-[787px] w-full max-[768px]:mb-10">
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
                  <h3 className="text-center text-blue md:hidden">
                    {item.date}
                  </h3>
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
