"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import Image from "next/image";

import data from "../../../data/owned-events.json";
import AnimatedTextLine from "../../../components/AnimatedTextLine";
import { useLayoutEffect } from "react";

import Footer from "../../../components/sections/Footer";
import Header from "../../../components/sections/Header";
import Button from "../../../components/ui/Button";
import HeroTitleFadeIn from "../../../components/HeroTitleFadeIn";
import Link from "next/link";

interface HeroData {
  title: string;
  description: string;
}

export default function OurOwnedEvents() {
  const { hero, events }: { hero: HeroData; events: any[] } = data;

  const contentRef = useRef<HTMLDivElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const visibleEvents = showAll ? events : events.slice(0, 9);

  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const bgImagesRef = useRef<Array<HTMLImageElement | null>>([]);

  console.log("hello from slug page");

  const setBgImageRef = (index: number) => (el: HTMLImageElement | null) => {
    bgImagesRef.current[index] = el;
  };

  const gridRef = useRef<HTMLDivElement | null>(null); // 👉🏻 новый ref

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
      delay: 0.5, // ⏱️ 1 секунда задержки перед стартом
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 80%", // 🔥 когда 20% секции дойдут до верха экрана
        toggleActions: "play none none none",
        once: true,
      },
    });

    cards.forEach((card, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const delay = (row + col) * 0.1; // медленнее stagger

      const subTl = gsap.timeline();
      subTl.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.6, // 🐢 плавнее
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
  }, [visibleEvents]);

  console.log(
    "[Grid] Event slugs:",
    visibleEvents.map((e) => e.slug)
  );

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

  return (
    <div
      ref={contentRef}
      className={`transition-opacity duration-1000 bg-blue z-[100000] `}
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="fixed top-0 right-0 translate-x-1/2 -translate-y-1/2">
          <div className="relative w-[770px] h-[770px]">
            {/* Верхняя звезда — половина видна */}
            <img
              ref={setBgImageRef(0)}
              src="/assets/logo/bbr-events-vector.svg"
              alt=""
              className="absolute top-[1100px] md:top-[300px] right-[350px] md:right-[100px] w-[770px] h-[770px]"
            />

            {/* Нижняя звезда — соприкасается правым верхним углом с нижним левым углом первой */}
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
        className="w-full h-[100vh] flex items-center justify-center px-[16px] md:px-[40px]"
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
              className={`event-card relative group cursor-pointer overflow-hidden  ${
                i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
              ref={(el: HTMLDivElement | null) => {
                cardsRef.current[i] = el;
              }}
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
                <div
                  className="absolute top-1/2 left-1/2 
                  -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <img src={event.logo} alt="Event Logo" />
                </div>{" "}
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
