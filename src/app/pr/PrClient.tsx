// src/app/pr/PrClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "../../../lib/gsap";

import AnimatedTextLine from "../../../components/ui/typography/AnimatedTextLine";
import Footer from "../../../components/sections/Footer/index";
import Button from "../../../components/ui/buttons/Button";
import Header from "../../../components/sections/Header";
import HeroTitleFadeIn from "../../../components/ui/typography/HeroTitleFadeIn";
import SubTitleLine from "../../../components/ui/typography/SubTitleLine";
import AnimatedStrokeByStroke from "../../../components/ui/typography/AnimatedStrokeByStroke";
import MoreEvents from "../../../components/bloks/MoreEvents";

import type { PrContent } from "../../../lib/api/pr";
import type { PortfolioItemRaw } from "../../../lib/api/portfolio";

interface PrClientProps {
  content: PrContent;
  latestItems: PortfolioItemRaw[];
}

export default function PrClient({ content, latestItems }: PrClientProps) {
  const { hero, where_we_started, services, featured_on, latest_meta } =
    content;
  // Претварамо PortfolioItemRaw у облик који MoreEvents очекује
  const eventsForMore = latestItems.map((item) => ({
    title: item.title,
    media: {
      hero_image: item.acf.media.hero_image.url,
    },
    event_information: {
      text: item.acf.event_information.text,
    },
  }));
  const slugsForMore = latestItems.map((item) => item.slug);

  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);

  const scrollToNextSection = () => {
    const nextSection = document.querySelector("[data-scroll-target]");
    if (nextSection) {
      const offset = 142;
      const top =
        nextSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!showIntro && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          setContentVisible(true);
          setAnimationsReady(true);
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        },
      });
    }
  }, [showIntro]);

  useEffect(() => {
    const t = setTimeout(() => setShowIntro(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={contentRef}
      className="transition-opacity duration-1000 bg-blank z-[100000]"
    >
      <Header animationsReady={animationsReady} />
      <main
        data-bg="light"
        className={`w-full h-[100vh] flex items-center justify-center px-[16px] md:px-[40px]
          transition-opacity duration-1000 relative ${
            contentVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <AnimatedTextLine delay={1.1} className="absolute mx-auto">
          <img
            className="w-[100%] md:w-[65%] mx-auto"
            src="/assets/logo/bbr-pr-vector.svg"
            alt={hero.title}
          />
        </AnimatedTextLine>

        <div className="w-full flex gap-[46px] justify-center flex-col md:flex-row md:justify-between items-start">
          <div>
            <HeroTitleFadeIn
              delay={1}
              className="max-w-[600px] text-blue text-left"
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
          className="z-1020 absolute md:bottom-[40px] md:left-[40px] bottom-[16px] left-[16px]
            w-[38px] h-[38px] flex items-center justify-center transition-all duration-300
            hover:translate-y-[4px] hover:opacity-80 cursor-pointer"
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
            />
            <path
              d="M27.5 19H10.67"
              stroke="#21224b"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </main>

      <section data-scroll-target className="">
        <div className="flex gap-[22px]">
          <video
            src={hero.video_src}
            className="w-screen h-screen md:w-full md:h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </section>

      <section className="px-[16px] md:px-[40px] text-blue">
        <div className="space-y-[40px] md:space-y-[130px] md:pb-[108px]">
          <SubTitleLine title={where_we_started.sub_title} />
          <div className="flex flex-col gap-[75px] md:gap-[130px]">
            {/* први блок */}
            <div className="flex flex-col md:flex-row gap-[40px] md:gap-[26px]">
              <div className="w-full md:max-w-[439px] space-y-[50px]">
                <h2>
                  <AnimatedStrokeByStroke
                    text={where_we_started.content[0].title}
                  />
                </h2>
                <div className="space-y-[24px]">
                  {where_we_started.content[0].description.map((p, i) => (
                    <AnimatedTextLine key={i}>
                      <p>{p}</p>
                    </AnimatedTextLine>
                  ))}
                </div>
              </div>
              <div className="relative w-full h-[494px]">
                <Image
                  src={where_we_started.content[0].media.image_src}
                  alt={where_we_started.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* велики наслов */}
            <h2
              className="text-[64px] font-[900] text-center uppercase leading-[1.1]
              break-words whitespace-normal"
            >
              <AnimatedStrokeByStroke
                text={where_we_started.title}
                className="md:!text-[128px] !text-[78px] !leading-[72px]
                  md:!leading-[129px] text-center !font-[900] px-[16px] md:px-[40px]"
              />
            </h2>

            {/* други блок */}
            <div className="flex flex-col md:flex-row w-full md:w-[90%] mx-auto gap-[40px] md:gap-[76px] justify-center">
              <div className="relative w-full  md:max-w-[556px] h-[350px] ">
                <Image
                  src={where_we_started.content[1].media.image_src}
                  alt={where_we_started.content[1].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-4/6 space-y-[50px]">
                <h3>
                  <AnimatedStrokeByStroke
                    text={where_we_started.content[1].title}
                  />
                </h3>
                <div className="space-y-[24px]">
                  {where_we_started.content[1].description.map((p, i) => (
                    <AnimatedTextLine key={i}>
                      <p>{p}</p>
                    </AnimatedTextLine>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-[16px] md:px-[40px] text-blue">
        <SubTitleLine title={services.sub_title} />
        <div className="md:py-[40px] py-[90px]">
          <h2 className="max-w-[1065px]">
            <AnimatedStrokeByStroke
              text={services.title}
              className="text-left"
            />
          </h2>
          <div className="space-y-[40px] my-[90px]">
            {services.content.map((ele, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col-reverse md:flex-row
                  gap-[40px] md:gap-[131px]"
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
                    src={ele.media.image_src}
                    alt={ele.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              text="Let’s Talk"
              type="button"
              link="/contact"
              color="black"
            />
          </div>
        </div>
      </section>

      {/* FEATURED ON */}
      <section className="px-[16px] md:px-[40px]">
        <SubTitleLine title={featured_on.sub_title} />
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8 py-[50px]">
          {featured_on.gallery.map((logo, i) => (
            <Image
              key={i}
              src={logo}
              alt={`sponsor-${i}`}
              width={120}
              height={60}
              className="object-contain mx-auto"
            />
          ))}
        </div>
      </section>

      {/* LATEST */}
      <MoreEvents
        flag="event"
        title={latest_meta.title}
        link="/our-owned-events"
        events={eventsForMore}
        slug={slugsForMore}
      />

      <Footer />
    </div>
  );
}
