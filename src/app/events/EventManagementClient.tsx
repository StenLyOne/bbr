// src/app/events/EventManagementClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import Image from "next/image";

import AnimatedTextLine from "../../../components/ui/typography/AnimatedTextLine";
import Footer from "../../../components/sections/Footer";
import Button from "../../../components/ui/buttons/Button";
import Header from "../../../components/sections/Header";
import HeroTitleFadeIn from "../../../components/ui/typography/HeroTitleFadeIn";
import SubTitleLine from "../../../components/ui/typography/SubTitleLine";
import EventCaroursel from "../../../components/bloks/EventCaroursel";
import AnimatedStrokeByStroke from "../../../components/ui/typography/AnimatedStrokeByStroke";
import SomeWorks from "../../../components/bloks/SomeWorks";
import { EventPageData } from "../../../lib/api";

interface Props {
  data: EventPageData;
}

export default function EventManagementClient({ data }: Props) {
  const { hero, management, carousel, services, some_of_our_work } = data;
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP intro/outro logic
  useEffect(() => {
    const timeout = setTimeout(() => setShowIntro(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!showIntro && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          setContentVisible(true);
          setAnimationsReady(true);
          requestAnimationFrame(() => ScrollTrigger.refresh());
        },
      });
    }
  }, [showIntro]);

  const scrollToNextSection = () => {
    const next = document.querySelector("[data-scroll-target]");
    if (!next) return;
    const top = next.getBoundingClientRect().top + window.scrollY - 142;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      ref={contentRef}
      className={`transition-opacity duration-1000 bg-blue z-[100000] ${
        contentVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Header animationsReady={animationsReady} />

      {/* ===== HERO ===== */}
      <main
        data-bg="dark"
        className="transition-opacity duration-1000 relative w-full h-[100vh] flex items-center justify-center px-[16px] md:px-[40px] text-blank"
      >
        <AnimatedTextLine delay={1.1} className="absolute mx-auto">
          <img
            className="w-[100%] md:w-[65%] mx-auto"
            src="/assets/logo/bbr-events-vector.svg"
            alt={hero.title}
          />
        </AnimatedTextLine>
        <div className="w-full flex gap-[46px] flex-col md:flex-row md:justify-between items-start">
          <div>
            <HeroTitleFadeIn
              delay={1.3}
              className="max-w-[600px] text-blank text-left break-all"
            >
              {hero.title}
            </HeroTitleFadeIn>
          </div>
          <div>
            <AnimatedTextLine delay={1.5}>
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
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M27.5 19H10.67"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </main>

      {/* ===== MANAGEMENT ===== */}
      <section
        data-scroll-target
        className="text-blank px-[16px] md:px-[40px]"
      >
        <SubTitleLine color="white" title={management.sub_title} />
        <div className="pt-[30px] md:pt-[50px] space-y-[70px] md:space-y-[170px]">
          <div className="space-y-[70px] md:space-y-[120px]">
            <div className="space-y-[30px] max-w-[787px]">
              <h2>
                <AnimatedStrokeByStroke text={management.title} />
              </h2>
              <AnimatedTextLine>
                <p>{management.description}</p>
              </AnimatedTextLine>
            </div>
            <div className="flex flex-col md:flex-row gap-[22px]">
              <div className="relative w-full md:w-2/3 h-[201px] md:h-[500px]">
                <Image
                  src={management.media_large.url}
                  alt={management.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full md:w-1/3 h-[400px] md:h-[500px]">
                <Image
                  src={management.media_small.url}
                  alt={management.sub_title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-[70px]">
            <div className="relative hidden md:block w-full max-w-[443px] h-[500px]">
              {management.content[0].media && (
                <Image
                  src={management.content[0].media.url}
                  alt={management.content[0].title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col gap-[80px]">
              <div className="space-y-[38px]">
                <h2 className="text-[32px] font-bold text-white">
                  <AnimatedStrokeByStroke text={management.content[0].title} />
                </h2>
                <AnimatedTextLine>
                  <p className="text-white text-base leading-relaxed">
                    {management.content[0].description}
                  </p>
                </AnimatedTextLine>
              </div>
              <div className="relative md:hidden w-full h-[400px]">
                {management.content[0].media && (
                  <Image
                    src={management.content[0].media.url}
                    alt={management.content[0].title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="space-y-[38px]">
                <h3 className="text-[24px] font-bold text-white">
                  <AnimatedStrokeByStroke text={management.content[1].title} />
                </h3>
                <AnimatedTextLine>
                  <p className="text-white text-base leading-relaxed">
                    {management.content[1].description}
                  </p>
                </AnimatedTextLine>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CAROUSEL ===== */}
      <section className="space-y-[60px] md:space-y-[100px] mt-[70px] md:mt-[140px] text-blank">
        <AnimatedStrokeByStroke
          text={carousel.title}
          className="break-all !text-[72px] md:!text-[128px] !leading-[72px] md:!leading-[129px] text-center !font-[900] px-[16px] md:px-[40px]"
        />
        <EventCaroursel images={carousel.gallery} />
      </section>

      {/* ===== SERVICES ===== */}
      <section className="px-[16px] md:px-[40px] pb-[90px] text-blank">
        <SubTitleLine color="white" title={services.sub_title} />
        <h2 className="mt-[30px] md:mt-[70px]">
          <AnimatedStrokeByStroke text={services.title} />
        </h2>
        <div className="space-y-[70px] md:space-y-[40px] my-[90px]">
          {services.content.map((ele, idx) => (
            <div
              key={idx}
              className="w-full md:w-[85%] flex flex-col-reverse md:flex-row gap-[40px] md:gap-[131px]"
            >
              <div className="w-full md:w-2/3 space-y-[30px]">
                <h3>
                  <AnimatedStrokeByStroke text={ele.title} />
                </h3>
                <AnimatedTextLine>
                  <p>{ele.description}</p>
                </AnimatedTextLine>
              </div>
              <div className="relative w-full md:w-[443px] h-[278px]">
                <Image
                  src={ele.media.url}
                  alt={ele.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button text="Let’s Talk" link="/contact" color="white" />
        </div>
      </section>

      {/* ===== SOME OF OUR WORK ===== */}
      <section className="px-[16px] md:px-[40px] pb-[51px] text-blank">
        <h2 className="pb-[46px]">
          <AnimatedStrokeByStroke text={some_of_our_work.title} />
        </h2>
        <SomeWorks works={some_of_our_work.works} />
      </section>

      <Footer color="black" />
    </div>
  );
}
