import Image from "next/image";
import SubTitleLine from "../ui/SubTitleLine";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import AnimatedTextLine from "../AnimatedTextLine";

interface Stat {
  name: string;
  number: string;
}

interface EventItem {
  name: string;
  name_mobile: string;
  url: string;
  logo: string;
  image: string;
  stats: Stat[];
}

interface Props {
  data: {
    sub_title: string;
    title: string;
    events: EventItem[];
  };
}

export default function OwnedEventsDesktop({ data }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [activeIndex, setActiveIndex] = useState(0);
  const total = data.events.length;
  const wrapperHeight = total * 2.2 * 45;

  useEffect(() => {
    if (typeof window === "undefined" || !isDesktop || !wrapperRef.current)
      return;

    const baseShift = 40;
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "owned-events",
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${total * baseShift * 2}%`,
        scrub: true,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      },
    });

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: `+=${total * baseShift * 2}%`,
      scrub: true,
      onUpdate: (self) => {
        const newIndex = Math.min(total - 1, Math.floor(self.progress * total));
        setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
      },
    });

    const totalScrollDuration = total * baseShift;

    const steps = data.events.flatMap((_, i) => {
      const base = i * baseShift;

      return [
        {
          range: [base + 2, base + 12],
          animation: (duration: number) =>
            gsap.fromTo(
              `.logo-line-${i}`,
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration, ease: "power4.out" }
            ),
        },
        {
          range: [base + 2, base + 12],
          animation: (duration: number) =>
            gsap.fromTo(
              `.image-${i}`,
              { clipPath: "inset(0 0 0 100%)", opacity: 1 },
              { clipPath: "inset(0 0 0 0%)", opacity: 1, duration }
            ),
        },
        {
          range: [base + 18, base + 19],
          animation: (duration: number) =>
            gsap.to(`.logo-line-${i}`, {
              y: -100,
              opacity: 0,
              duration,
              ease: "power4.inOut",
            }),
        },
        {
          range: [base + 20, base + 24],
          animation: (duration: number) => {
            const lines = gsap.utils.toArray<HTMLElement>([
              `.stat-line-${i}-0`,
              `.stat-line-${i}-1`,
              `.stat-line-${i}-2`,
            ]);
            return gsap.to(lines, {
              y: 0,
              opacity: 1,
              duration,
              ease: "power4.out",
              stagger: 0.3,
            });
          },
        },
        {
          range: [base + 35, base + 36],
          animation: (duration: number) =>
            gsap.to(`.stats-${i}`, { opacity: 0, y: -50, duration }),
        },
      ];
    });

    tl.duration(totalScrollDuration);
    steps.forEach(({ range, animation }) => {
      const [startP, endP] = range;
      const start = (startP / 100) * totalScrollDuration;
      const duration = ((endP - startP) / 100) * totalScrollDuration;
      tl.add(animation(duration), start);
    });
    timelineRef.current = tl;

    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [data.events, isDesktop]);

  const scrollToEvent = (index: number) => {
    const section = wrapperRef.current;
    if (!section || !timelineRef.current) return;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;

    gsap.to(window, {
      scrollTo: sectionTop,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        const baseProgress = index / total;
        const targetProgress = Math.min(baseProgress + 0.05, 0.99);

        gsap.to(timelineRef.current!, {
          progress: targetProgress,
          duration: 1,
          ease: "power2.inOut",
        });
      },
    });
  };

  return (
    <div className="relative w-full overflow-hidden ">
      <div ref={wrapperRef} style={{ height: `${wrapperHeight}vh` }}>
        <div className="px-[16px] md:px-[40px]">
          <SubTitleLine title={data.sub_title} />
          <AnimatedTextLine>
            <h2 className="max-w-[676px] mx-auto my-[40px] md:my-[60px] text-center text-blue">
              {data.title}
            </h2>
          </AnimatedTextLine>

          <div className="w-full mb-[20px] ">
            <AnimatedTextLine
              stagger={0.1}
              className="w-full flex gap-[8px]"
              width={"full"}
            >
              {data.events.map((event, index) => {
                const isActive = activeIndex === index;

                return (
                  <div key={index} className="w-full sm:w-auto flex" data-line>
                    <button
                      onClick={() => {
                        setActiveIndex(index);
                        scrollToEvent(index - 1);
                      }}
                      className="hover:bg-blue text-blank"
                      style={{
                        width: "100%",
                        padding: "30px",
                        borderRadius: "8px",
                        border: isActive
                          ? "1px solid #6276fb"
                          : "1px solid black",
                        fontSize: "18px",
                        fontWeight: 600,
                        fontFamily: "Zabal",
                        lineHeight: "55%",
                        cursor: "pointer",
                        backgroundColor: isActive ? "#6276fb" : "transparent",
                        color: isActive ? "#fff" : "#21224b",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {event.name}
                    </button>
                  </div>
                );
              })}
            </AnimatedTextLine>
          </div>

          <div className="w-full flex gap-[16px] relative">
            <div className="relative w-2/3 bg-blue flex items-center justify-center overflow-hidden">
              {data.events.map((event, index) => (
                <div
                  key={`logo-wrap-${index}`}
                  className="overflow-hidden w-[300px] h-[150px] absolute flex justify-center items-center"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={event.logo}
                      alt={event.name}
                      width={300}
                      height={150}
                      className={`logo-${index} logo-line-${index} block translate-y-full opacity-0`}
                    />
                  </div>
                </div>
              ))}
              {data.events.map((event, index) => (
                <div
                  key={`stats-${index}`}
                  className={`stats-${index} absolute inset-0 flex justify-center gap-[50px] ld:gap-[80px] items-center `}
                >
                  {event.stats.map((stat, statIdx) => (
                    <div
                      key={statIdx}
                      className="text-white text-center z-[20]"
                    >
                      <h2 className="overflow-hidden">
                        <span
                          className={`stat-line-${index}-${statIdx} block translate-y-full`}
                        >
                          {stat.number}
                        </span>
                      </h2>
                      <p className="overflow-hidden">
                        <span
                          className={`stat-line-${index}-${statIdx} block translate-y-full`}
                        >
                          {stat.name}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="w-1/3 h-[443px] relative bg-blue">
              {data.events.map((event, index) => (
                <Image
                  key={`image-${index}`}
                  src={event.image}
                  alt={event.name}
                  width={443}
                  height={443}
                  className={`image-${index} absolute object-cover w-full h-full opacity-1`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
