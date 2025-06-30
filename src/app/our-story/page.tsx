// src/app/our-story/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import Image from "next/image";

import { fetchOurStoryContent, OurStoryData } from "../../../lib/api";

import AnimatedTextLine from "../../../components/AnimatedTextLine";
import AnimatedStrokeByStroke from "../../../components/AnimatedStrokeByStroke";
import TimelineSection from "../../../components/bloks/TimelineSection";
import TestimonialCarousel from "../../../components/bloks/TestimonialCarousel";

import Header from "../../../components/sections/Header";
import Footer from "../../../components/sections/Footer";
import HeroTitleFadeIn from "../../../components/HeroTitleFadeIn";
import SubTitleLine from "../../../components/ui/SubTitleLine";

export default function OurStory() {
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);
  const [story, setStory] = useState<OurStoryData | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 1) skinimo intro
  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 500);
    return () => clearTimeout(t);
  }, []);

  // 2) šrafujemo fade‑in cele stranice
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

  // 3) fetchujemo Our Story iz WP-a
  useEffect(() => {
    fetchOurStoryContent()
      .then((data) => setStory(data))
      .catch((err) => console.error("Our Story load error:", err));
  }, []);

  // dok ne dođe story, ništa ne renderujemo
  if (!story) return null;

  const { hero, what_we_do, where_we_started, timeline, testimonial } = story;

  const scrollToNextSection = () => {
    const nextSection = document.querySelector("[data-scroll-target]");
    if (!nextSection) return;
    const offset = 142;
    const top = nextSection.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      ref={contentRef}
      className="transition-opacity duration-1000 bg-blank z-[100000]"
    >
      <Header animationsReady={animationsReady} />

      {/* Hero Intro */}
      <main
        data-bg="light"
        className={`w-full h-[100vh] flex items-center justify-center px-[16px] 
          md:px-[40px] transition-opacity duration-1000 relative ${
            contentVisible ? "opacity-100 pointer-events-auto" : ""
          }`}
      >
        <div className="w-full flex gap-[46px] justify-center flex-col md:flex-row md:justify-between items-start">
          <div>
            <HeroTitleFadeIn
              delay={1}
              className="max-w-[442px] text-blue text-left"
            >
              {hero.title}
            </HeroTitleFadeIn>
          </div>
          <div>
            <AnimatedTextLine delay={1.1}>
              <p className="large text-blue max-w-[788px]">
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
              stroke="#21224b"
              strokeWidth="1.5"
            />
            <path
              d="M16.5703 12.9302L10.5003 19.0002L16.5703 25.0702"
              stroke="#21224b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M27.5 19H10.67"
              stroke="#21224b"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </main>

      {/* What We Do */}
      <section
        data-scroll-target
        className="bg-white-gris px-[16px] md:px-[40px]"
      >
        <SubTitleLine title={what_we_do.sub_title} />
        <div className="flex flex-col-reverse md:flex-row gap-[48px] md:gap-[77px] py-[30px] md:py-[130px] pl-[100px] md:pl-0">
          <Image
            src={what_we_do.media.image_src}
            alt={what_we_do.sub_title}
            width={556}
            height={350}
            className="object-cover w-full md:w-[556px] h-[244px] md:h-[350px]"
          />
          <div className="w-full md:w-1/2 text-blue space-y-[36px] md:space-y-[52px]">
            <h2>
              <AnimatedStrokeByStroke text={what_we_do.title} />
            </h2>
            <AnimatedTextLine>
              <p>{what_we_do.description}</p>
            </AnimatedTextLine>
          </div>
        </div>
      </section>

      {/* Where We Started */}
      <section className="bg-blank px-[16px] md:px-[40px]">
        <SubTitleLine title={where_we_started.sub_title} />
        <div className="py-[30px] md:py-[130px] space-y-[60px] md:space-y-[120px]">
          <div className="flex flex-col md:flex-row justify-between gap-[60px] md:gap-[24px] text-blue">
            <div className="w-full md:w-1/3 space-y-[28px] md:space-y-[50px]">
              <h2>
                <AnimatedStrokeByStroke
                  text={where_we_started.content[0].title}
                />
              </h2>
              <div className="space-y-[20px]">
                {where_we_started.content[0].description.map((ele, i) => (
                  <AnimatedTextLine key={i}>
                    <p>{ele}</p>
                  </AnimatedTextLine>
                ))}
              </div>
            </div>
            <div className="relative w-full md:w-2/3 h-[226px] md:h-[500px]">
              <Image
                src={where_we_started.content[0].media.image_src}
                alt={where_we_started.content[0].title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          {where_we_started.content.slice(1).map((ele, idx) => (
            <div
              key={idx}
              className="flex flex-col-reverse md:flex-row gap-[60px] md:gap-[76px]"
            >
              <div className="relative w-full md:w-2/3 h-[350px] md:ml-[60px]">
                <Image
                  src={ele.media.image_src}
                  alt={ele.title} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/3 space-y-[37px]">
                <h3>
                  <AnimatedStrokeByStroke text={ele.title} />
                </h3>
                <div className="space-y-[18px]">
                  {ele.description.map((text, j) => (
                    <AnimatedTextLine key={j}>
                      <p>{text}</p>
                    </AnimatedTextLine>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white-gris">
        <div className="px-[16px] md:px-[40px]">
          <SubTitleLine title={timeline.sub_title} />
          <h2 className="text-blue py-[40px] md:py-[100px] text-center">
            <AnimatedStrokeByStroke text={timeline.title} />
          </h2>
        </div>
        <TimelineSection data={timeline} />
      </section>

      {/* Testimonials */}
      <section className="bg-white-gris px-[16px] md:px-[40px]">
        <SubTitleLine title={testimonial.sub_title} />
        <div className="pt-[50px] md:pt-[100px] pb-[40px]">
          <h2 className="mb-[64px] md:mb-[108px] mx-auto text-center text-blue">
            <AnimatedStrokeByStroke text={testimonial.title} />
          </h2>
          <TestimonialCarousel testimonial={testimonial.testimonials} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
