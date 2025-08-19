"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "../../../../components/sections/Header";
import Footer from "../../../../components/sections/Footer";
import SubTitleLine from "../../../../components/ui/typography/SubTitleLine";
import EventCaroursel from "../../../../components/bloks/EventCaroursel";
import Button from "../../../../components/ui/buttons/Button";
import HeroTitleFadeIn from "../../../../components/ui/typography/HeroTitleFadeIn";
import AnimatedTextLine from "../../../../components/ui/typography/AnimatedTextLine";
import MoreEvents from "../../../../components/bloks/MoreEventsSlider";

import {
  PortfolioItemData,
  PortfolioTeaser,
} from "../../../../lib/api";

export default function SinglePortfolioClient({
  work,
  teasers,
}: {
  work: PortfolioItemData;
  teasers: PortfolioTeaser[];
}) {
  const [animationsReady, setAnimationsReady] = useState(false);

  function scrollToNextSection() {
    const next = document.querySelector("[data-scroll-target]");
    if (!next) return;
    const top = next.getBoundingClientRect().top + window.scrollY - 142;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div className="bg-white text-foreground">
      <Header animationsReady={animationsReady} />

      {/* ── HERO ─────────────────────────────── */}
      <main className="relative w-full h-[100vh] overflow-hidden" data-bg="dark">
        <Image
          src={work.media.hero_image}
          alt={work.title}
          fill
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center p-[16px] md:p-[40px]">
          <HeroTitleFadeIn delay={1} className="text-white uppercase mr-auto">
            {work.title}
          </HeroTitleFadeIn>
        </div>

        <button
          onClick={scrollToNextSection}
          className="z-1020 absolute md:bottom-[40px] md:left-[40px] bottom-[16px] left-[16px] w-[38px] h-[38px] flex items-center justify-center transition-all duration-300 hover:translate-y-[4px] hover:opacity-80"
        >
          <svg className="rotate-270" width="38" height="38" viewBox="0 0 38 38" fill="none">
            <rect x="0.75" y="0.75" width="36.5" height="36.5" rx="18.25" stroke="#FFF" strokeWidth="1.5" />
            <path d="M16.57 12.93 10.5 19l6.07 6.07" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M27.5 19H10.67" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </main>

      {/* ── INFO ─────────────────────────────── */}
      <section data-scroll-target className="mx-auto px-[16px] md:px-[40px]" data-bg="light">
        <div className="w-full">
          <SubTitleLine title={work.event_information.sub_title} />

          <div className="w-full flex flex-col-reverse lg:flex-row md:gap-[130px] pt-[32px] md:pt-[118px] pb-[72px] md:pb-[141px]">
            <AnimatedTextLine className="text-blue pt-[46px] md:hidden">
              <p>{work.event_information.text}</p>
            </AnimatedTextLine>

            {/* left column */}
            <div className="md:w-[443px]">
              <AnimatedTextLine
                stagger={0.2}
                className="text-blue space-y-0 divide-y divide-blue border-t border-blue w-[443px]"
              >
                {work.event_information.info_block.items.map((it, i, arr) => (
                  <div
                    key={i}
                    className={`py-[26px] ${i === arr.length - 1 ? "border-b border-blue" : ""}`}
                  >
                    <p className="!font-bold">{it.title}</p>
                    <p className="whitespace-pre-line">{it.value}</p>
                  </div>
                ))}
              </AnimatedTextLine>
            </div>

            {/* right column */}
            <div className="space-y-[50px] w-full md:max-w-[60%]">
              <AnimatedTextLine className="w-full">
                <h2 className="text-blue">{work.event_information.title}</h2>
              </AnimatedTextLine>
              <AnimatedTextLine>
                <p className="text-blue hidden md:block">
                  {work.event_information.text}
                </p>
              </AnimatedTextLine>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <EventCaroursel images={work.gallery} />

      {/* STATS */}
      <section className="pb-[16px] md:pb-[40px]">
        <div className="mx-auto px-[16px] md:px-[40px]">
          <SubTitleLine title={work.stats_block.sub_title} />

          <AnimatedTextLine>
            <h2 className="max-w-[800px] uppercase mr-auto pt-[32px] md:pt-[116px] pb-[46px] md:pb-[134px] text-blue">
              {work.stats_block.title}
            </h2>
          </AnimatedTextLine>

          {/* indicators */}
          <div className="hidden md:flex">
            <AnimatedTextLine
              stagger={0.2}
              className="flex w-full justify-center mb-[16px] text-blue text-center"
              width="full"
            >
              {work.stats_block.indicators.map((ind, idx, arr) => (
                <div
                  key={idx}
                  className={`w-full px-[24px] py-[10px] min-w-[140px] border-blue border-y-[4px] border-l-[4px] ${
                    idx === arr.length - 1 ? "border-r-[4px]" : ""
                  }`}
                >
                  <p className="!font-[700]">{ind}</p>
                </div>
              ))}
            </AnimatedTextLine>
          </div>

          {/* mobile indicators */}
          <div className="block md:hidden">
            <AnimatedTextLine
              stagger={0.2}
              className="space-y-[24px] justify-center mb-[16px] py-[31px] text-blue text-center border-1 border-blue"
              width="full"
            >
              {work.stats_block.indicators.map((ind, idx) => (
                <p key={idx} className="!font-[700]">
                  {ind}
                </p>
              ))}
            </AnimatedTextLine>
          </div>

          {/* stats numbers */}
          <AnimatedTextLine
            stagger={0.2}
            className="grid grid-cols-2 md:grid-cols-3 gap-[16px] text-blue"
          >
            {work.stats_block.stats.map((st, idx) => (
              <div
                key={idx}
                className="bg-white-gris py-[70px] md:py-[169px] flex flex-col items-center justify-center text-center"
              >
                <p className="!text-[40px] md:!text-[84px] !leading-[60px] md:!leading-[90px] !font-[900] mb-[10px] md:mb-[24px]">
                  {st.value}
                </p>
                <p className="large text-[16px] leading-[24px] font-[500]">
                  {st.label}
                </p>
              </div>
            ))}
          </AnimatedTextLine>
        </div>
      </section>

      {/* VIDEO */}
      <section className="relative h-[100vh] w-full">
        <video
          src={work.media.video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </section>

      {/* SPONSORS */}
      <section className="mx-auto px-4 md:px-[40px] py-16">
        <SubTitleLine title={work.sponsors.sub_title} />
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
          {work.sponsors.items.map((logo, idx) => (
            <Image
              key={idx}
              src={logo}
              alt={`sponsor-${idx}`}
              width={120}
              height={60}
              className="object-contain mx-auto"
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto px-4 md:px-[40px] pb-24 flex flex-wrap gap-4 justify-center">
        {work.cta.map((btn, idx) => (
          <Button key={idx} text={btn.label} link={btn.link} />
        ))}
      </section>

      {/* MORE EVENTS */}
      <MoreEvents
        events={teasers}
        title="More events"
        link="/portfolio/"
        slug={teasers.map((t) => t.slug)}
        flag="event"
      />

      <Footer />
    </div>
  );
}
