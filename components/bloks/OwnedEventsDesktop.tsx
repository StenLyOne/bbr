"use client";

import Image from "next/image";
import { gsap } from "../../lib/gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../ui/buttons/Button";
import SubTitleLine from "../ui/typography/SubTitleLine";

interface Stat {
  name: string;
  number: string;
}

interface MediaItem {
  image_src: string;
  logo_src: string;
  alt: string;
}

interface EventItem {
  name: string;
  link: string;
  headline?: string;
  description?: string;
  stats: Stat[];
  media: MediaItem;
}

interface Props {
  data: {
    sub_title: string;
    title: string;
    events: EventItem[];
  };
}

const FALLBACK_DESCRIPTION =
  "Detailed event information will be available soon.";

export default function OwnedEventsDesktop({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [renderedIndex, setRenderedIndex] = useState<number | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const detailsContentRef = useRef<HTMLDivElement | null>(null);

  const activeEvent = useMemo(
    () => (renderedIndex === null ? null : data.events[renderedIndex] ?? null),
    [renderedIndex, data.events]
  );

  useEffect(() => {
    if (activeIndex !== null) {
      setRenderedIndex(activeIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    const details = detailsRef.current;
    const content = detailsContentRef.current;
    if (!details) return;

    gsap.killTweensOf(details);
    if (content) gsap.killTweensOf(content);

    if (activeIndex !== null && renderedIndex !== null) {
      gsap.set(details, { pointerEvents: "auto" });
      gsap.fromTo(
        details,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.45, ease: "power3.out", overwrite: true }
      );
      if (content) {
        gsap.fromTo(
          content,
          { y: 24, autoAlpha: 0.7 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power3.out",
            overwrite: true,
          }
        );
      }
      return;
    }

    if (renderedIndex !== null) {
      gsap.to(details, {
        autoAlpha: 0,
        duration: 0.35,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => {
          setRenderedIndex(null);
          gsap.set(details, { pointerEvents: "none" });
        },
      });
      if (content) {
        gsap.to(content, {
          y: 16,
          autoAlpha: 0.75,
          duration: 0.3,
          ease: "power2.in",
          overwrite: true,
        });
      }
    } else {
      gsap.set(details, { autoAlpha: 0, pointerEvents: "none" });
    }
  }, [activeIndex, renderedIndex]);

  return (
    <div className="w-full px-4 pb-16 md:px-10 md:pb-24 ">
      <SubTitleLine title={data.sub_title || "BBR OWNED EVENTS"} />


      <div className="relative">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {data.events.map((event, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={`${event.link}-${index}`}
                type="button"
                onClick={() => setActiveIndex((prev) => (prev === index ? null : index))}
                className="group relative block aspect-[4/4] overflow-hidden text-left cursor-pointer"
                aria-expanded={isActive}
                aria-controls={isActive ? "owned-event-expanded" : undefined}
              >
                {event.media.image_src ? (
                  <Image
                    src={event.media.image_src}
                    alt={event.media.alt || event.name}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-blue/10" />
                )}

                <div
                  className={`absolute inset-0 bg-[#1b224e]/60 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                />

                <div
                  className={`absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                >
                  {event.media.logo_src ? (
                    <img
                      src={event.media.logo_src}
                      alt={`${event.name} logo`}
                      className="max-h-[120px] max-w-[260px] object-contain"
                    />
                  ) : (
                    <span className="text-blank text-[28px] font-[700] uppercase tracking-[0.08em]">
                      {event.name}
                    </span>
                  )}
                </div>

              </button>
            );
          })}
        </div>

        <div
          ref={detailsRef}
          className="absolute inset-0 h-full w-full overflow-hidden"
        >
          {activeEvent && (
            <div
              id="owned-event-expanded"
              ref={detailsContentRef}
              className="relative min-h-[520px] bg-blue md:min-h-[700px] h-full"
            >
              {activeEvent.media.image_src ? (
                <Image
                  src={activeEvent.media.image_src}
                  alt={activeEvent.media.alt || activeEvent.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              ) : null}

              <div className="absolute inset-0 bg-[#1b224e]/80" />

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close event details"
                className="absolute right-4 top-4 z-20  cursor-pointer md:right-8 md:top-8"
              >
                <span className="relative mx-auto block h-5 w-5">
                  <span className="absolute left-1/2 top-1/2 h-[1px] w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
                  <span className="absolute left-1/2 top-1/2 h-[1px] w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white" />
                </span>
              </button>

              <div className="relative flex justify-between flex-col z-10 h-full px-5 py-8 text-blank md:px-12 md:py-12 xl:px-16 xl:py-14">
                <h3 className=" text-center! font-[900]! uppercase leading-[67.5px]!  text-[48px]!">
                  {activeEvent.headline || activeEvent.name}
                </h3>

                <div className="mt-8 flex justify-between gap-10 lg:mt-12 ">
                  <div className="w-[40%] flex items-center justify-between">
                    {activeEvent.media.logo_src ? (
                      <img
                        src={activeEvent.media.logo_src}
                        alt={`${activeEvent.name} logo`}
                        className=" w-[60%] object-contain object-left"
                      />
                    ) : (
                      <p className="text-[28px] font-[700] uppercase tracking-[0.08em]">
                        {activeEvent.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-[80px] flex flex-col w-[70%]">
                    <div className="flex gap-10 items-end justify-between w-full h-full ">
                      {activeEvent.stats.map((stat, index) => (
                        <div key={`${stat.name}-${index}`} className="space-y-6 flex flex-col items-center">
                          <p className="text-[63px]! leading-[67.5px]! font-[900]! ">
                            {stat.number}
                          </p>
                          <p className="text-[21px]! text-center text-balance leading-[21px]! text-blank/90">
                            {stat.name}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="w-full text-[22px]  ml-auto text-blank/90 flex">
                      {activeEvent.description?.trim() || FALLBACK_DESCRIPTION}
                    </p>
                  </div>
                </div>
                <div className="mt-10 flex md:justify-end">
                  <Button
                    arrow
                    color="white"
                    link={activeEvent.link}
                    text="Learn More"

                  >
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
