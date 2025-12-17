// src/components/pages/EventPageClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Header from "../sections/Header";
import Footer from "../sections/Footer/index";
import SubTitleLine from "../ui/typography/SubTitleLine";
import EventCaroursel from "../bloks/EventCaroursel";
import Button from "../ui/buttons/Button";
import HeroTitleFadeIn from "../ui/typography/HeroTitleFadeIn";
import MoreEvents from "../bloks/MoreEvents";
import { gsap, ScrollTrigger } from "../../lib/gsap";

interface Media {
  hero_image: string;
  logo: string;
  alt: string;
  video: string;
}

interface EventInformation {
  sub_title: string;
  title: string;
  text: string;
  info_block?: { items: { title: string; value: string }[] };
}

interface StatsBlock {
  sub_title: string;
  title?: string;
  indicators?: string[];
  stats: { label: string; value: string }[];
}

interface Sponsors {
  sub_title: string;
  items: string[];
}

interface CTA {
  label: string;
  link: string;
}

export interface EventType {
  slug: string;
  title: string;
  media: Media;
  event_information: EventInformation;
  gallery: string[];
  stats_block: StatsBlock;
  sponsors: Sponsors;
  cta: CTA[];
}

interface Props {
  event: EventType;
}

export default function EventPageClient({ event }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          // autoplay blocked — silently ignore
        });
      }
    };

    video.load(); // перезагружаем источник
    tryPlay(); // пробуем сразу
    video.addEventListener("canplay", tryPlay); // пробуем, когда готово

    return () => {
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

  // scroll to top + fade‑in
  useEffect(() => {
    window.scrollTo({ top: 0 });
    requestAnimationFrame(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready && ref.current) {
      gsap.to(ref.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => ScrollTrigger.refresh(),
      });
    }
  }, [ready]);

  const scrollToNext = () => {
    const next = document.querySelector("[data-scroll-target]");
    if (next) {
      const top = next.getBoundingClientRect().top + window.scrollY - 142;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={ref}
      className="transition-opacity duration-1000 opacity-0 bg-white text-foreground"
    >
      <Header animationsReady={ready} />

      {/* Hero */}
      <main className="relative w-full h-screen overflow-hidden" data-bg="dark">
        <Image
          src={event.media.hero_image}
          alt={event.media.alt}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <HeroTitleFadeIn delay={1} className="text-white uppercase">
            {event.title}
          </HeroTitleFadeIn>
        </div>
        <button onClick={scrollToNext} className="absolute bottom-10 left-10">
          {/* svugdje stavi vašu strelicu SVG */}
        </button>
      </main>

      {/* Info */}
      <section
        data-scroll-target
        className="px-4 md:px-10 py-20"
        data-bg="light"
      >
        <SubTitleLine title={event.event_information.sub_title} />
        <h2 className="text-blue pt-8">{event.event_information.title}</h2>
        <p className="mt-4 whitespace-pre-line">
          {event.event_information.text}
        </p>
        {event.event_information.info_block?.items && (
          <div className="mt-8 border-t border-blue divide-y divide-blue">
            {event.event_information.info_block.items.map((it, i) => (
              <div key={i} className="py-4">
                <strong>{it.title}</strong>
                <p className="whitespace-pre-line">{it.value}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Gallery */}
      <EventCaroursel images={event.gallery} />

      {/* Stats */}
      <section className="px-4 md:px-10 py-20">
        <SubTitleLine title={event.stats_block.sub_title} />
        {event.stats_block.title && (
          <h2 className="uppercase mt-8">{event.stats_block.title}</h2>
        )}
        {event.stats_block.indicators && (
          <div className="flex flex-wrap gap-4 mt-4 text-blue">
            {event.stats_block.indicators.map((ind, i) => (
              <span key={i} className="font-bold">
                {ind}
              </span>
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {event.stats_block.stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-extrabold">{s.value}</p>
              <p className="mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Full‑screen video */}
      <section className="h-screen w-full">
        <video
          ref={videoRef}
          src={event.media.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          className="w-full h-full object-cover"
        />
      </section>

      {/* Sponsors */}
      <section className="px-4 md:px-10 py-16">
        <SubTitleLine title={event.sponsors.sub_title} />
        <div className="grid grid-cols-3 md:grid-cols-4 gap-8 mt-8">
          {event.sponsors.items.map((logo, i) => (
            <Image
              key={i}
              src={logo}
              alt={`sponsor-${i}`}
              width={120}
              height={60}
              className="mx-auto"
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-10 pb-24 flex flex-wrap gap-4 justify-center">
        {event.cta.map((cta, i) => (
          <Button key={i} text={cta.label} link={cta.link} />
        ))}
      </section>

      {/* More Events — statički iz data/owned-events.json */}
      <MoreEvents
        events={[]}
        title="MORE EVENTS"
        link="/our-owned-events"
        slug={[]}
        flag="event"
      />

      <Footer />
    </div>
  );
}
