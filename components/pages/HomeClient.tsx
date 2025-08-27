"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import type {
  HeroData,
  MissionData,
  EventItem,
  MissionSecondaryData,
  PartnersData,
  LatestData,
  OwnedEventsData,
} from "../../lib/api/home";
import PageIntro from "../sections/AnimatedIntro";

import Header from "../../components/sections/Header";
import Hero from "../../components/sections/Hero";
import Mission from "../../components/sections/Mission";
import Events from "../../components/sections/Events";
import MissionSecondary from "../../components/sections/MissionSecondary";
import OwnedEvents from "../../components/sections/OwnedEvents";
import Partners from "../../components/sections/Partners";
import Latest from "../../components/sections/Latest";
import Footer from "../../components/sections/Footer/index";

type HomeClientProps = {
  hero: HeroData;
  mission: MissionData;
  events: EventItem[];
  missionSecondary: MissionSecondaryData;
  partners: PartnersData;
  latest: LatestData;
  ownedEvents: OwnedEventsData | null;
};

export default function HomeClient({
  hero,
  mission,
  events,
  missionSecondary,
  partners,
  latest,
  ownedEvents,
  
}: HomeClientProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [hasScrolledTop, setHasScrolledTop] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // scroll-to-top on mount (клиент)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => setHasScrolledTop(true));
  }, []);

  // GSAP fade-in
  useEffect(() => {
    if (!showIntro && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          setAnimationsReady(true);
          requestAnimationFrame(() => ScrollTrigger.refresh());
        },
      });
    }
  }, [showIntro]);

  // lock/unlock scroll во время интро
  useEffect(() => {
    const html = document.documentElement;
    if (showIntro) {
      html.classList.add("no-scroll");
      ScrollTrigger.getAll().forEach((t) => t.disable(false));
    } else {
      html.classList.remove("no-scroll");
      ScrollTrigger.getAll().forEach((t) => t.enable());
    }
    return () => {
      html.classList.remove("no-scroll");
      ScrollTrigger.getAll().forEach((t) => t.enable());
    };
  }, [showIntro]);

  if (!hasScrolledTop) return null;

  return (
    <>
      {/*  PageIntro */}
      {showIntro && <PageIntro onFinish={() => setShowIntro(false)} />}
      <div
        ref={contentRef}
        className="transition-opacity duration-1000 bg-blank opacity-100"
      >
        <Header animationsReady={animationsReady} />

        <div className="relative z-[101] fix-gpu" data-bg="dark">
          <Hero data={hero} animationsReady={animationsReady} />
        </div>

        <div className="relative z-[101]" data-bg="light" />

        <div data-scroll-target className="relative z-[101]" data-bg="light">
          <Mission data={mission} />
        </div>

        <div className="relative z-[1001]" data-bg="light">
          <Events data={events} />
        </div>

        <div className="relative z-[102]" data-bg="light">
          <MissionSecondary data={missionSecondary} />
        </div>

        {ownedEvents && (
          <div className="relative z-[101]" data-bg="light">
            <OwnedEvents data={ownedEvents} />
          </div>
        )}

        <div className="relative z-[101]" data-bg="light">
          <Partners data={partners} />
        </div>

        <div className="relative z-[101]" data-bg="light">
          <Latest data={latest} />
        </div>

        <div className="footer-trigger h-[50vh]" />
        <footer className="fixed bottom-0 left-0 w-full">
          <Footer/>
        </footer>
      </div>
    </>
  );
}
