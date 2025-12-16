// src/app/digital/DigitalClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import AnimatedTextLine from "../../../components/ui/typography/AnimatedTextLine";
import Footer from "../../../components/sections/Footer/index";
import Button from "../../../components/ui/buttons/Button";
import Header from "../../../components/sections/Header";
import HeroTitleFadeIn from "../../../components/ui/typography/HeroTitleFadeIn";
import SubTitleLine from "../../../components/ui/typography/SubTitleLine";
import AnimatedStrokeByStroke from "../../../components/ui/typography/AnimatedStrokeByStroke";
import MoreEvents from "../../../components/bloks/MoreEvents";

import type { DigitalContent } from "../../../lib/api/digital";
import type { PortfolioItemRaw } from "../../../lib/api/portfolio";

interface DigitalClientProps {
  content: DigitalContent & { two_column_title: string };
  latestItems: PortfolioItemRaw[];
}

export default function DigitalClient({
  content,
  latestItems,
}: DigitalClientProps) {
  const {
    hero,
    communications,
    two_column_title,
    two_column,
    what_we_offer,
    latest_meta,
  } = content;

  // припрема за LATEST
  const eventsForMore = latestItems.map((item) => ({
    title: item.title,
    media: { hero_image: item.acf.media.hero_image.url },
    event_information: { text: item.acf.event_information.text },
  }));
  const slugsForMore = latestItems.map((item) => item.slug);

  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);

  const scrollToNextSection = () => {
    const next = document.querySelector("[data-scroll-target]");
    if (!next) return;
    const top = next.getBoundingClientRect().top + window.scrollY - 142;
    window.scrollTo({ top, behavior: "smooth" });
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
          requestAnimationFrame(() => ScrollTrigger.refresh());
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
      className="transition-opacity duration-1000 bg-rouge z-[100000]"
    >
      <Header animationsReady={animationsReady} />

      {/* HERO */}
      <main
        data-bg="dark"
        className={`
        transition-opacity duration-1000 relative w-full h-[100vh]
        flex items-center justify-center px-[16px] md:px-[40px] 
        ${contentVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      >
        <AnimatedTextLine delay={1.1} className="absolute mx-auto">
          <img
            className=" w-[100%] md:w-[100%] mx-auto"
            src="/assets/logo/bbr-digital-vector-2.svg"
            alt={hero.title}
          />
        </AnimatedTextLine>
        <div className="w-full flex gap-[46px] justify-center flex-col md:flex-row md:justify-between items-start">
          <div>
            <HeroTitleFadeIn
              delay={1.3}
              className={"max-w-[600px] text-blank text-left break-all"}
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

      {/* COMMUNICATIONS */}
      <section
        data-scroll-target
        className="text-blank relative z-[1] bg-rouge"
        data-bg="light"
      >
        <div className="px-[16px] md:px-[40px]">
          <SubTitleLine color="white" title={communications.sub_title} />
        </div>
        <div className="pt-[20px] md:pt-[50px] space-y-[90px]">
          <div className="space-y-[30px] max-w-[787px] px-[16px] md:px-[40px]">
            <h2>
              <AnimatedStrokeByStroke text={communications.title} />
            </h2>
            <AnimatedTextLine>
              <p>{communications.description}</p>
            </AnimatedTextLine>
          </div>
          <div className="flex gap-[22px]">
            <video
              src={communications.video_src}
              className="w-screen h-screen md:w-full md:h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </section>

      {/* ДВОКОЛОНА секција */}
      <section className="space-y-[100px] text-blank">
        <div className="px-[16px] md:px-[40px]">
          <SubTitleLine color="white" title={what_we_offer.sub_title} />
          <div className="flex mt-[40px] md:mt-0 flex-col gap-[70px] md:gap-[130px]">
            {/* прва два */}
            {two_column.slice(0, 2).map((blk, idx) => (
              <TwoColumnBlock
                key={idx}
                title={blk.title}
                description={blk.description}
                media={blk.media}
                reverse={idx % 2 !== 0}
              />
            ))}

            {/* велики наслов */}
            <div className="text-[64px] font-[900] text-center uppercase leading-[1.1]">
              <AnimatedStrokeByStroke
                text={two_column_title}
                className="break-all text-left !text-[60px] md:!text-[128px] !leading-[60px] md:!leading-[129px] !font-[900]  md:px-[40px]"
              />
            </div>

            {/* остала два */}
            {two_column.slice(2).map((blk, idx) => (
              <TwoColumnBlock
                key={idx + 2}
                title={blk.title}
                description={blk.description}
                media={blk.media}
                reverse={(idx + 2) % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* GRID секција “What We Offer” */}
      <section className="px-[16px] md:px-[40px] py-[40px] md:py-[90px] text-blank">
        <SubTitleLine color="white" title={what_we_offer.sub_title} />
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-left md:text-center mt-[30px] md:mt-[100px]">
            <AnimatedStrokeByStroke text={what_we_offer.title} />
          </h2>
          <div className="grid gap-[60px] md:gap-[100px] my-[90px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {what_we_offer.content.map((blk, i) => (
              <div key={i} className="flex flex-col ">
                {blk.icon_src && (
                  <AnimatedTextLine>
                    <img
                      src={blk.icon_src}
                      alt={blk.title}
                      className=" md:mx-0 max-w-[80px]"
                    />
                  </AnimatedTextLine>
                )}
                <h3 className="!text-[19px]text-left mt-[41px] mb-[21px]">
                  <AnimatedStrokeByStroke text={blk.title} />
                </h3>
                <AnimatedTextLine>
                  <p className="text-left">{blk.description}</p>
                </AnimatedTextLine>
              </div>
            ))}
          </div>
          <AnimatedTextLine>
            <p className="large text-center max-w-[936px] md:text-left mb-[100px] mx-auto">
              {what_we_offer.description}
            </p>
          </AnimatedTextLine>
          <div className="flex justify-center">
            <Button
              text="Let’s Talk"
              type="button"
              link="/contact"
              color="white"
            />
          </div>
        </div>
      </section>

      {/* LATEST */}
      <MoreEvents
        color="transporent"
        flag="event"
        title={latest_meta.title}
        link="/our-owned-events"
        events={eventsForMore}
        slug={slugsForMore}
      />

      <Footer color="rouge" />
    </div>
  );
}

interface TwoColumnBlockProps {
  title: string;
  description: string;
  media: { image_src: string; alt?: string };
  reverse?: boolean;
}
const TwoColumnBlock = ({
  title,
  description,
  media,
  reverse = false,
}: TwoColumnBlockProps) => (
  <div
    className={`flex flex-col md:flex-row ${
      reverse ? "md:flex-row-reverse" : ""
    } items-center justify-between gap-[40px]`}
  >
    <div className="w-full md:w-1/2">
      <h2 className="text-[24px] font-[800] mb-[30px] md:mb-[40px]">
        <AnimatedStrokeByStroke text={title} />
      </h2>
      <AnimatedTextLine>
        <p className="text-[16px] leading-[1.5]">{description}</p>
      </AnimatedTextLine>
    </div>
    <div className="w-full md:w-1/2 flex justify-center">
      <div className="w-full md:max-w-max">
        <img
          src={media.image_src}
          alt={title}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  </div>
);
