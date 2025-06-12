"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

import data from "../../data/home.json";
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
  const [showIntro, setShowIntro] = useState(true);
  const [hasScrolledTop, setHasScrolledTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);

  // Принудительно прокручиваем в начало перед монтированием контента
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
      // Ждём следующий тик
      requestAnimationFrame(() => {
        setHasScrolledTop(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!showIntro && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          setAnimationsReady(true); // ✅ запускаем флаг
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        },
      });
    }
  }, [showIntro]);

  useEffect(() => {
    const html = document.documentElement;

    if (showIntro) {
      html.classList.add("no-scroll");
      ScrollTrigger.getAll().forEach((trigger) => trigger.disable(false)); // Отключаем ScrollTrigger
    } else {
      html.classList.remove("no-scroll");
      ScrollTrigger.getAll().forEach((trigger) => trigger.enable()); // Включаем ScrollTrigger
    }

    return () => {
      html.classList.remove("no-scroll");
      ScrollTrigger.getAll().forEach((trigger) => trigger.enable());
    };
  }, [showIntro]);

  if (!hasScrolledTop) return null; // Не рендерим DOM до scrollTop

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
        <div className="relative z-[101]" data-bg="dark">
          <Hero data={data.hero} animationsReady={animationsReady} />
        </div>

        <div className=" relative z-[101]" data-bg="light"></div>

        <div data-scroll-target className=" relative z-[101]" data-bg="light">
          <Mission data={data.mission} />
        </div>

        <div className=" relative z-[1001]" data-bg="light">
          <Events data={data.bbr_events} />
        </div>

        <div className=" relative z-[102]" data-bg="light">
          <MissionSecondary data={data.mission_secondary} />
        </div>

        <div className=" relative z-[101]" data-bg="light">
          <OwnedEvents data={data.owned_events} />
        </div>

        <div className="relative z-[101]" data-bg="light">
          <Partners data={data.partners} />
        </div>

        <div className="relative z-[101]" data-bg="light">
          <Latest data={data.latest} />
        </div>

        <div className="footer-trigger h-[50vh]" />
        <footer className="fixed bottom-0 left-0 w-full">
          <Footer />
        </footer>
      </div>
    </>
  );
}
