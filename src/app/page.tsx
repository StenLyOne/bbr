// src/app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import fallbackData from "../../data/home.json";
import {
  fetchHomeContent,
  fetchOwnedEventsRaw,
  HeroData,
  MissionData,
  EventItem,
  MissionSecondaryData,
  PartnersData,
  LatestData,
  OwnedEventsData,
  OwnedEventsRaw,
} from "../../lib/api";

import Header from "../../components/sections/Header";
import Hero from "../../components/sections/Hero";
import Mission from "../../components/sections/Mission";
import Events from "../../components/sections/Events";
import MissionSecondary from "../../components/sections/MissionSecondary";
import OwnedEvents from "../../components/sections/OwnedEvents";
import Partners from "../../components/sections/Partners";
import Latest from "../../components/sections/Latest";
import PageIntro from "../../components/sections/AnimatedIntro";
import Footer from "../../components/sections/Footer";

export default function Home() {
  const [hero, setHero] = useState<HeroData>(fallbackData.hero);
  const [mission, setMission] = useState<MissionData>({
    sub_title: fallbackData.mission.sub_title,
    content:   fallbackData.mission.content,
  });
  const [events, setEvents] = useState<EventItem[]>(fallbackData.bbr_events);
  const [missionSecondary, setMissionSecondary] = useState<MissionSecondaryData>(fallbackData.mission_secondary);
  const [partners, setPartners] = useState<PartnersData>(fallbackData.partners);
  const [latest, setLatest] = useState<LatestData>(fallbackData.latest);
  const [ownedEvents, setOwnedEvents] = useState<OwnedEventsData | null>(null);

  const [showIntro, setShowIntro] = useState(true);
  const [hasScrolledTop, setHasScrolledTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
      requestAnimationFrame(() => setHasScrolledTop(true));
    }
  }, []);

  // GSAP fade-in
  useEffect(() => {
    if (!showIntro && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity:  1,
        duration: 1,
        ease:     "power2.out",
        onComplete: () => {
          setAnimationsReady(true);
          requestAnimationFrame(() => ScrollTrigger.refresh());
        },
      });
    }
  }, [showIntro]);

  // Disable scroll during intro
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

  // Fetch everything
  useEffect(() => {
    fetchHomeContent()
      .then(async ({ hero: h, mission: m, events: ev, mission_secondary: ms, partners: ps, latest: lt, owned_events_meta }) => {
        setHero(h);
        setMission(m);
        setEvents(ev);
        setMissionSecondary(ms);
        setPartners(ps);
        setLatest(lt);

        // owned-events
        const rawList = await fetchOwnedEventsRaw();
        const filtered = rawList.filter(o => owned_events_meta.events.includes(o.id));
        const mapped: OwnedEventsData["events"] = filtered.map(o => ({
          name: o.title,
          link: `/our-owned-events/${o.slug}`,
          media: {
            image_src: o.acf.media.hero_image.url,
            logo_src:  o.acf.media.logo.url,
            // pull ACF alt (or fallback to title)
            alt:        o.acf.media.alt || o.title,
          },
          stats: (o.acf.stats_block?.stats ?? [])
            .slice(0, 3)
            .map(s => ({ name: s.label, number: s.value })),
        }));

        setOwnedEvents({
          sub_title: owned_events_meta.sub_title,
          title:     owned_events_meta.title,
          events:    mapped,
        });
      })
      .catch(err => console.error("WP REST fetch error:", err));
  }, []);

  if (!hasScrolledTop) return null;

  return (
    <>
      {showIntro && <PageIntro onFinish={() => setShowIntro(false)} />}

      <div
        ref={contentRef}
        className={`transition-opacity duration-1000 bg-blank ${
          showIntro ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
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
          <Footer />
        </footer>
      </div>
    </>
  );
}
