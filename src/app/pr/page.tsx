"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import data from "../../../data/pr.json";
import AnimatedTextLine from "../../../components/AnimatedTextLine";

import Footer from "../../../components/sections/Footer";
import Button from "../../../components/ui/Button";
import Header from "../../../components/sections/Header";
import HeroTitleFadeIn from "../../../components/HeroTitleFadeIn";
import SubTitleLine from "../../../components/ui/SubTitleLine";
import TimelineSection from "../../../components/bloks/TimelineSection";
import EventCaroursel from "../../../components/bloks/EventCaroursel";
import AnimatedStrokeByStroke from "../../../components/AnimatedStrokeByStroke";
import MoreEvents from "../../../components/bloks/MoreEvents";

export default function EventManagement() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);

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

  const { hero, where_we_started, services, featured_on, latest } = data;
  return (
    <div
      ref={contentRef}
      className={`transition-opacity duration-1000 bg-blank z-[100000] `}
    >
      <Header animationsReady={animationsReady} />
      <main
        data-bg="light"
        className="w-full h-[100vh] flex items-center justify-center px-[16px] md:px-[40px]"
      >
        <div className="w-full flex gap-[46px] justify-center flex-col md:flex-row md:justify-between items-start">
          <div>
            <HeroTitleFadeIn
              delay={1}
              className={"max-w-[600px] text-blue text-left"}
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
      <section data-scroll-target className=" px-[16px] md:px-[40px] ">
        <video
          src={hero.media.video_src}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>
      <section className=" px-[16px] md:px-[40px] text-blue">
        <div className="space-y-[40px] md:space-y-[100px]">
          <SubTitleLine title={where_we_started.sub_title} />
          <div className="flex flex-col gap-[75px] md:gap-[130px]">
            <div className="flex flex-col md:flex-row gap-[40px] md:gap-[26px]">
              <div className=" w-full md:max-w-[439px] space-y-[50px]">
                <h2>{where_we_started.content[0].title}</h2>
                <div className="space-y-[24px]">
                  {Array.isArray(where_we_started.content[0].description) ? (
                    where_we_started.content[0].description.map((p, i) => (
                      <p key={i} className="]">
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="">
                      {where_we_started.content[0].description}
                    </p>
                  )}
                </div>
              </div>
              <div className="relative w-full h-[494px]">
                <Image
                  src={where_we_started.content[0].media.image_src}
                  alt={where_we_started.content[0].media.alt}
                  fill
                />
              </div>
            </div>

            <h2 className="text-[64px] font-[900] text-center uppercase leading-[1.1] break-words whitespace-normal">
              <AnimatedStrokeByStroke
                text={where_we_started.title}
                className="md:!text-[128px] !text-[78px] !leading-[72px] md:!leading-[129px] text-center !font-[900] px-[16px] md:px-[40px] "
              ></AnimatedStrokeByStroke>
            </h2>

            <div className="flex flex-col md:flex-row gap-[40px] md:gap-[76px] justify-center">
              <div className="relative w-full max-w-[556px] h-[494px]">
                <Image
                  src={where_we_started.content[1].media.image_src}
                  alt={where_we_started.content[1].media.alt}
                  fill
                />
              </div>
              <div className=" w-full md:max-w-[670px] space-y-[50px]">
                <h3>{where_we_started.content[1].title}</h3>
                <div className="space-y-[24px]">
                  {Array.isArray(where_we_started.content[0].description) ? (
                    where_we_started.content[0].description.map((p, i) => (
                      <p key={i} className="]">
                        {p}
                      </p>
                    ))
                  ) : (
                    <p className="">
                      {where_we_started.content[0].description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-[16px] md:px-[40px] text-blue">
        <SubTitleLine title={services.sub_title} />
        <div className="md:py-[40px] py-[90px]">
          <h2 className="max-w-[1065px]">
            <AnimatedStrokeByStroke
              text={services.title}
              className="text-left"
            ></AnimatedStrokeByStroke>
          </h2>
          <div className="space-y-[40px] my-[90px]">
            {services.content.map((ele, index) => (
              <div
                key={index}
                className=" w-full md:w-[85%] flex flex-col-reverse md:flex-row gap-[40px] md:gap-[131px]"
              >
                <div className="w-full md:w-2/3 space-y-[30px]">
                  <h3>{ele.title}</h3>
                  <p>{ele.description}</p>
                </div>
                <div className="relative w-full md:w-[443px] h-[278px]">
                  <Image
                    src={ele.media.image_src}
                    alt={ele.media.alt}
                    fill
                    className="object-fill"
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
      <section className="px-[16px] md:px-[40px] ">
        <SubTitleLine title={featured_on.sub_title} />

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8 py-[50px]">
          {featured_on.gallery?.map((logo, index) => {
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
      <section className="bg-white-gris px-[16px] md:px-[40px] pb-[51px]">
        <MoreEvents
        
          flag="event"
          title={latest.title}
          link="/our-owned-events"
        />
      </section>
      <Footer  />
    </div>
  );
}
