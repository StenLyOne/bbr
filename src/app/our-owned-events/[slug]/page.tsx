"use client";

import MoreEvents from "../../../../components/bloks/MoreEvents";
import eventsData from "../../../../data/owned-events.json";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import data from "../../../../data/owned-events.json";
import Header from "../../../../components/sections/Header";
import Footer from "../../../../components/sections/Footer";
import SubTitleLine from "../../../../components/ui/SubTitleLine";
import EventCaroursel from "../../../../components/bloks/EventCaroursel";
import Button from "../../../../components/ui/Button";
import HeroTitleFadeIn from "../../../../components/HeroTitleFadeIn";
import { useEffect, useRef, useState } from "react";
import AnimatedTextLine from "../../../../components/AnimatedTextLine";

export default function EventPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState<(typeof data.events)[0] | null>(null);
  const [animationsReady, setAnimationsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const filteredEvents = data.events
    .filter((e) => e.slug !== slug)
    .slice(-3)
    .reverse();

  console.log("[EventPage] useParams.slug:", slug);
  console.log("✅ [slug]/page.tsx loaded");

  useEffect(() => {
    console.log("[EventPage] useEffect triggered. Slug:", slug);

    if (typeof slug === "string") {
      const matched = data.events.find((ev) => ev.slug === slug);
      if (matched) {
        console.log("[EventPage] Matching event found:", matched.title);
      } else {
        console.warn("[EventPage] No matching event found for slug:", slug);
      }
      setEvent(matched ?? null);
    } else {
      console.warn("[EventPage] Slug is not a valid string:", slug);
    }

    setLoading(false);
  }, [slug]);

  if (loading) {
    console.log("[EventPage] Loading...");
    return null;
  }

  if (!event) {
    console.error("[EventPage] 404 – Event not found");
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <h1 className="text-3xl">404 – Event not found</h1>
      </div>
    );
  }

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

  console.log("[EventPage] Rendering event:", event.title);

  return (
    <div className="bg-white text-foreground">
      <Header animationsReady={animationsReady} />

      {/* Hero Section */}
      <main
        className="relative w-full h-[100vh] overflow-hidden "
        data-bg="dark"
      >
        <Image
          src={event.media.hero_image}
          alt={event.title}
          fill
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center p-[16px] md:p-[40px]">
          <HeroTitleFadeIn delay={1} className="text-white uppercase mr-auto">
            {event.title}
          </HeroTitleFadeIn>
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

      {/* Info Section */}
      <section
        data-scroll-target
        className="mx-auto  px-[16px] md:px-[40px]"
        data-bg="light"
      >
        <div className="w-full ">
          <SubTitleLine title={event.event_information.sub_title} />
          <div className="w-full flex flex-col-reverse lg:flex-row justify-start md:gap-[130px] pt-[32px] md:pt-[118px] pb-[72px] md:pb-[141px]">
            <AnimatedTextLine className="text-blue pt-[46px] md:hidden">
              <p className="">{event.event_information.text}</p>{" "}
            </AnimatedTextLine>
            <div className="md:w-[443px]">
              <AnimatedTextLine
                stagger={0.2}
                className="text-blue space-y-0 divide-y divide-blue border-t border-blue w-[443px]"
              >
                {event.event_information.info_block?.items.map(
                  (item, i, arr) => (
                    <div
                      key={i}
                      className={`py-[26px] ${
                        i === arr.length - 1 ? "border-b border-blue" : ""
                      }`}
                    >
                      <p className="!font-bold">{item.title}</p>
                      <p className="whitespace-pre-line">{item.value}</p>
                    </div>
                  )
                )}
              </AnimatedTextLine>
            </div>
            <div className="space-y-[50px] w-full md:max-w-[60%]">
              <AnimatedTextLine className="w-full">
                <h2 className="text-blue">{event.event_information.title}</h2>
              </AnimatedTextLine>
              <AnimatedTextLine>
                <p className="text-blue hidden md:block">
                  {event.event_information.text}
                </p>
              </AnimatedTextLine>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <EventCaroursel images={event.gallery} />

      {/* Stats Block */}
      <section className="pb-[16px] md:pb-[40px]">
        <div className=" mx-auto px-[16px] md:px-[40px]">
          <SubTitleLine title={event.stats_block.sub_title} />
          {/* Title */}
          <AnimatedTextLine>
            <h2 className="max-w-[800px] uppercase mr-auto pt-[32px] md:pt-[116px] pb-[46px] md:pb-[134px] text-blue">
              {event.stats_block.title}
            </h2>
          </AnimatedTextLine>
          {/* Indicators */}
          <div className="hidden md:flex">
            <AnimatedTextLine
              stagger={0.2}
              className="flex w-full justify-center mb-[16px] text-blue text-center"
              width="full"
            >
              {event.stats_block.indicators?.map((indicator, index, arr) => {
                const isFirst = index === 0;
                const isLast = index === arr.length - 1;
                return (
                  <div
                    key={index}
                    className={`w-full px-[24px] py-[10px] min-w-[140px] border-blue border-y-[4px] ${
                      isFirst ? "border-l-[4px]" : "border-l-[4px]"
                    } ${isLast ? "border-r-[4px]" : ""}`}
                  >
                    <p className="!font-[700]">{indicator}</p>
                  </div>
                );
              })}
            </AnimatedTextLine>
          </div>
          <div className="block md:hidden ">
            <AnimatedTextLine
              stagger={0.2}
              className="space-y-[24px] justify-center mb-[16px] py-[31px] text-blue text-center border-1 border-blue"
              width={"full"}
            >
              {event.stats_block.indicators?.map((indicator, index) => (
                <p key={index} className="!font-[700]">
                  {indicator}
                </p>
              ))}
            </AnimatedTextLine>
          </div>

          {/* Stats */}
          <div className="">
            <AnimatedTextLine
              stagger={0.2}
              className="grid grid-cols-2 md:grid-cols-3 gap-[16px] text-blue"
            >
              {event.stats_block.stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white-gris py-[70px] md:py-[169px] flex flex-col items-center justify-center text-center"
                >
                  <p className="!text-[40px] md:!text-[84px] !leading-[60px] md:!leading-[90px] !font-[900] mb-[10px] md:mb-[24px]">
                    {stat.value}
                  </p>
                  <p className="large text-[16px] leading-[24px] font-[500]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </AnimatedTextLine>
          </div>
        </div>
      </section>

      {/* Full Width Image Block */}
      <section className="relative h-[100vh] w-full">
        <video
          src={event.media.video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </section>

      {/* Sponsors */}
      <section className=" mx-auto px-4 md:px-[40px] py-16">
        <SubTitleLine title={event.sponsors.sub_title} />
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8">
          {event.sponsors.items?.map((logo, index) => {
            console.log(`[Sponsor] Logo ${index}:`, logo);
            return (
              <Image
                key={index}
                src={logo}
                alt={`sponsor-${index}`}
                width={120}
                height={60}
                className="object-contain mx-auto"
              />
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className=" mx-auto px-4 md:px-[40px] pb-24 flex flex-wrap gap-4 justify-center">
        {event.cta.map((item, index) => {
          console.log(`[CTA] Button ${index}:`, item.label, item.link);
          return (
            <Button key={index} text={item.label} link={item.link}></Button>
          );
        })}
      </section>

      <MoreEvents
        events={data.events}
        title={data.more_events.title}
        link="/our-owned-events/"
        slug={data.more_events.slug}
        flag="event"
      />

      <Footer />
    </div>
  );
}
