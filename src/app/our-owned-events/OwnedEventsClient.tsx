// src\app\our-owned-events\OwnedEventsClient.tsx

"use client";

import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/sections/Header";
import Footer from "../../../components/sections/Footer/index";
import Button from "../../../components/ui/buttons/Button";
import HeroTitleFadeIn from "../../../components/ui/typography/HeroTitleFadeIn";
import AnimatedTextLine from "../../../components/ui/typography/AnimatedTextLine";
import type { OwnedEventSettings, OwnedEvent } from "../../../lib/api/events";

interface Props {
  settings: OwnedEventSettings;
  events: OwnedEvent[];
}

export default function OwnedEventsClient({ settings, events }: Props) {
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const bgImagesRef = useRef<Array<HTMLImageElement | null>>([]);

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardsRef.current[index] = el;
    },
    []
  );

  const setBgImageRef = useCallback(
    (index: number) => (el: HTMLImageElement | null) => {
      bgImagesRef.current[index] = el;
    },
    []
  );

  const visibleEvents = showAll ? events : events.slice(0, 9);

  // Debug API data
  useEffect(() => {
    console.log("[OwnedEventsClient] Hero data:", {
      title: settings.hero.title,
      description: settings.hero.description,
    });
  }, [settings.hero]);

  // GSAP animations for cards and background images
  useLayoutEffect(() => {
    if (!cardsRef.current.length || !gridRef.current) return;

    const cards = cardsRef.current.filter(
      (el): el is HTMLDivElement => el !== null
    );

    const width = window.innerWidth;
    const cols = width >= 1024 ? 3 : width >= 640 ? 2 : 1;
    const rows = Math.ceil(cards.length / cols);

    gsap.set(cards, {
      opacity: 0,
      y: 80,
      scale: 0.9,
    });

    const tl = gsap.timeline({
      delay: 0.5,
      scrollTrigger: {
        id: "owned-events-cards",
        trigger: gridRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    cards.forEach((card, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const delay = (row + col) * 0.1;

      const subTl = gsap.timeline();
      subTl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.6,
        ease: "power3.out",
      });

      tl.add(subTl, delay);
    });

    gsap.fromTo(
      bgImagesRef.current.filter(Boolean),
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        delay: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: bgImagesRef.current[0],
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
      cardsRef.current = [];
      bgImagesRef.current = [];
    };
  }, [visibleEvents]);

  // Fade-in content
  useEffect(() => {
    console.log("[GSAP] Checking showIntro:", showIntro);
    if (!showIntro && contentRef.current) {
      console.log("[GSAP] Fade-in triggered for contentRef");
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onStart: () => console.log("[GSAP] Fade-in started"),
        onComplete: () => {
          console.log("[GSAP] Fade-in completed");
          setContentVisible(true);
          setAnimationsReady(true);
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            console.log("[GSAP] ScrollTrigger refreshed");
          });
        },
      });
    }
  }, [showIntro]);

  // Intro timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("[Intro] Setting showIntro to false");
      setShowIntro(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  // Scroll helper
  const scrollToNextSection = () => {
    const nextSection = document.querySelector("[data-scroll-target]");
    if (nextSection) {
      const offset = 142;
      const top =
        nextSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  // Unpack settings
  const { hero } = settings;

  return (
    <div
      ref={contentRef}
      className={`transition-opacity duration-1000 bg-blue z-[100000]`}
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="fixed top-0 right-0 translate-x-1/2 -translate-y-1/2">
          <div className="relative w-[770px] h-[770px]">
            <img
              ref={setBgImageRef(0)}
              src="/assets/logo/bbr-events-vector.svg"
              alt=""
              className="absolute top-[1100px] md:top-[300px] right-[350px] md:right-[100px] w-[770px] h-[770px]"
            />
            <img
              ref={setBgImageRef(1)}
              src="/assets/logo/bbr-events-vector.svg"
              alt=""
              className="absolute top-[1089px] right-[884px] w-[770px] h-[770px] opacity-50"
            />
          </div>
        </div>
      </div>

      <Header animationsReady={animationsReady} />

      <main
        data-bg="dark"
        className={`transition-opacity duration-1000 w-full h-[100vh] flex items-center justify-center px-[16px] md:px-[40px] ${
          contentVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full flex gap-[46px] justify-center flex-col md:flex-row md:justify-between items-start">
          <div>
            <HeroTitleFadeIn className="relative z-[1000000] max-w-[442px] text-blank text-left">
              {hero.title || "Fallback Title"}
            </HeroTitleFadeIn>
          </div>
          <div>
            <AnimatedTextLine>
              <p className="large text-blank max-w-[788px]">
                {hero.description || "Fallback Description"}
              </p>
            </AnimatedTextLine>
          </div>
        </div>
        <button
          onClick={scrollToNextSection}
          className="z-1020 absolute md:bottom-[40px] md:left-[40px] bottom-[16px] left-[16px] w-[38px] h-[38px] flex items-center justify-center transition-all duration-300 hover:translate-y-[4px] hover:opacity-80 cursor-pointer"
        >
          <svg
            className="rotate-270"
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.75"
              y="0.75"
              width="36.5"
              height="36.5"
              rx="18.25"
              stroke="#fff"
              strokeWidth="1.5"
            />
            <path
              d="M16.5703 12.9302L10.5003 19.0002L16.5703 25.0702"
              stroke="#fff"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M27.5 19H10.67"
              stroke="#fff"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </main>

      <section
        data-bg="light"
        data-scroll-target
        className="relative z-[101] p-[16px] md:p-[40px] mb-[135px]"
      >
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] auto-rows-[354px]"
        >
          {visibleEvents.map((event, i) => (
            <div
              key={i}
              className={`event-card relative group cursor-pointer overflow-hidden ${
                i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
              ref={setCardRef(i)}
            >
              <Link
                href={`/our-owned-events/${event.slug.replace(
                  /[^a-z0-9-]/gi,
                  ""
                )}`}
                onClick={() => console.log("[Link] Clicked slug:", event.slug)}
              >
                <Image
                  src={event.hero_image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <img src={event.logo} alt="Event Logo" />
                </div>
              </Link>
            </div>
          ))}
        </div>
        {!showAll && events.length > 9 && (
          <div className="flex justify-center mt-[158px]">
            <div className="z-[1]" onClick={() => setShowAll(true)}>
              <Button
                text="Load More"
                color="white"
                type="submit"
                arrow={false}
              />
            </div>
          </div>
        )}
      </section>

      <div className="z-[2] relative">
        <Footer color="black" />
      </div>
    </div>
  );
}
