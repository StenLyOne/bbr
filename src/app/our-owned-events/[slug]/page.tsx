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
          src={event.hero_image}
          alt={event.title}
          fill
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center p-[16px] md:p-[40px]">
          <HeroTitleFadeIn delay={1} className="text-white uppercase mr-auto">
            {event.title}
          </HeroTitleFadeIn>
        </div>
      </main>

      {/* Info Section */}
      <section className="mx-auto  px-[16px] md:px-[40px]" data-bg="light">
        <div className="w-full ">
          <SubTitleLine title={event.event_information.sub_title} />
          <div className="w-full flex flex-col-reverse lg:flex-row justify-between gap-[40px] pt-[32px] md:pt-[118px] pb-[72px] md:pb-[141px]">
            <AnimatedTextLine className="text-blue md:hidden">
              <p className="">{event.event_information.text}</p>{" "}
            </AnimatedTextLine>
            <div className="w-full">
              <AnimatedTextLine
                stagger={0.2}
                className="text-blue space-y-0 divide-y divide-blue border-t border-blue w-full max-w-[443px]"
              >
                {event.event_information.info_block?.items.map((item, i) => (
                  <div key={i} className="py-[26px]">
                    <p className="!font-bold">{item.title}</p>
                    <p className="whitespace-pre-line">{item.value}</p>
                  </div>
                ))}
              </AnimatedTextLine>
            </div>
            <div className="max-w-[787px] space-y-[50px]">
              <AnimatedTextLine>
                <h2 className="text-blue">{event.event_information.text}</h2>
              </AnimatedTextLine>
              <AnimatedTextLine>
                <p className="text-blue hidden md:block">{event.event_information.text}</p>
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
          <div className="hidden md:flex  ">
            <AnimatedTextLine
              stagger={0.2}
              className="flex w-full justify-center mb-[16px] text-blue text-center"
              width={"full"}
            >
              {event.stats_block.indicators?.map((indicator, index) => (
                <div
                  key={index}
                  className=" w-full px-[24px] py-[10px]  border border-blue border-x-[2px] border-y-[4px] min-w-[140px]"
                >
                  <p className="!font-[700]">{indicator}</p>
                </div>
              ))}
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
                  <p className="text-[16px] leading-[24px] font-[500]">
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
        {event.media_block.type === "video" ? (
          <video
            src={event.media_block.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={event.media_block.src}
            alt={event.media_block.title}
            fill
            className="object-cover"
          />
        )}
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
        link={data.more_events.link}
        slug={data.more_events.slug}
        flag="event"
      />

      <Footer />
    </div>
  );
}
