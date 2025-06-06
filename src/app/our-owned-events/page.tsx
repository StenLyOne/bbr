"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import Image from "next/image";

import data from "../../../data/owned-events.json";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import AnimatedTextLine from "../../../components/AnimatedTextLine";
import { useLayoutEffect } from "react";

import Footer from "../../../components/sections/Footer";
import Header from "../../../components/sections/Header";
import SubTitleLine from "../../../components/ui/SubTitleLine";
import Button from "../../../components/ui/Button";
import HeroTitleFadeIn from "../../../components/HeroTitleFadeIn";

interface HeroData {
  title: string;
  description: string;
}

interface Events {
  hero_image: string;
  logo: string;
  title: string;
  slug: string;
}

interface Data {
  hero: HeroData;
  events: Event[];
}

export default function OurOwnedEvents() {
  const { hero, events }: { hero: HeroData; events: any[] } = data;

  const [showIntro, setShowIntro] = useState(true);
  const [hasScrolledTop, setHasScrolledTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const visibleEvents = showAll ? events : events.slice(0, 9);

  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const bgImagesRef = useRef<Array<HTMLImageElement | null>>([]);

  const setBgImageRef = (index: number) => (el: HTMLImageElement | null) => {
    bgImagesRef.current[index] = el;
  };

  useLayoutEffect(() => {
    if (!cardsRef.current.length) return;

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: {
          amount: 1,
          grid: "auto",
          from: "start",
        },
        scrollTrigger: {
          trigger: ".grid",
          start: "top 80%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      bgImagesRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        delay: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: bgImagesRef.current[0], // или обёртку, если хочешь привязать к container
          start: "top 80%",
          once: true,
        },
      }
    );
  }, [visibleEvents]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
      requestAnimationFrame(() => {
        setHasScrolledTop(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!showIntro && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          setAnimationsReady(true);
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        },
      });
    }
  }, [showIntro]);

  return (
    <div
      ref={contentRef}
      className={`transition-opacity duration-1000 bg-blue z-[100000] `}
    >
      <div className="fixed inset-0 z-[0]">
        <img
          ref={setBgImageRef(0)}
          className="w-[770px] h-[770px] absolute top-[25%] left-[100%] 
      -translate-x-1/2 -translate-y-1/2"
          src="/assets/logo/bbr-events-vector.svg"
          alt=""
        />
        <img
          ref={setBgImageRef(1)}
          className="w-[770px] h-[770px] absolute top-[102%] left-[46%] 
      -translate-x-1/2 -translate-y-1/2"
          src="/assets/logo/bbr-events-vector.svg"
          alt=""
        />
      </div>
      <Header animationsReady={animationsReady} />
      <main
        className="w-full h-[100vh] flex items-center justify-center px-[16px] md:px-[40px]"
        data-bg="dark"
      >
        <div className="w-full flex gap-[46px] justify-center flex-col md:flex-row md:justify-between items-start">
          <div>
            <HeroTitleFadeIn
              delay={1}
              className={"max-w-[442px] text-blank text-left"}
            >
              {hero.title}
            </HeroTitleFadeIn>
          </div>
          <div>
            <AnimatedTextLine delay={1.1}>
              <p className="large text-blank max-w-[788px]">
                {hero.description}
              </p>
            </AnimatedTextLine>
          </div>
        </div>
      </main>
      <section className="p-[16px] md:p-[40px] mb-[135px]" data-bg="light">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px] auto-rows-[354px]">
          {visibleEvents.map((event, i) => (
            <div
              key={i}
              className={`event-card relative group cursor-pointer overflow-hidden rounded-md ${
                i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
              ref={(el: HTMLDivElement | null) => {
                cardsRef.current[i] = el;
              }}
            >
              <Image
                src={event.hero_image}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10" />
              <div
                className="absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <img src={event.logo} alt="Event Logo" />
              </div>
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
