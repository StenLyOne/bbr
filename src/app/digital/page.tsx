"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import data from "../../../data/digital.json";
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

  const { hero, communications, what_we_offer, visibility, latest } = data;
  return (
    <div
      ref={contentRef}
      className={`transition-opacity duration-1000 bg-rouge z-[100000] `}
    >
      <Header animationsReady={animationsReady} />
      <main
        data-bg="dark"
        className="w-full h-[100vh] flex items-center justify-center px-[16px] md:px-[40px]"
      >
        <div className="w-full flex gap-[46px] justify-center flex-col md:flex-row md:justify-between items-start">
          <div>
            <HeroTitleFadeIn
              delay={1}
              className={"max-w-[600px] text-blank text-left break-all"}
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
      <section data-scroll-target className="text-blank  " data-bg="light">
        <div className="px-[16px] md:px-[40px]">
          {" "}
          <SubTitleLine color="white" title={communications.sub_title} />
        </div>

        <div className="pt-[20px] md:pt-[50px] space-y-[90px] ">
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
              src={communications.media.video_src}
              className="w-screen h-screen md:w-full md:h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </section>
      <section className="space-y-[100px] text-blank">
        <div className="px-[16px] md:px-[40px]">
          <SubTitleLine color="white" title={what_we_offer.sub_title} />
          <div className="flex mt-[40px]  md:mt-[0px] flex-col gap-[70px] md:gap-[130px]">
            {what_we_offer.content.map((block, index) => {
              if (index == 1 || index == 0)
                return (
                  <div key={index}>
                    <TwoColumnBlock {...block} reverse={index % 2 !== 0} />
                  </div>
                );
            })}

            <div className="text-[64px] font-[900] text-center uppercase leading-[1.1]">
              <AnimatedStrokeByStroke
                text={what_we_offer.title}
                className="!text-[72px]  md:!text-[128px] !leading-[72px]  md:!leading-[129px] text-center !font-[900]  break-all"
              ></AnimatedStrokeByStroke>
            </div>

            {what_we_offer.content.map((block, index) => {
              if (index !== 0 && index !== 1)
                return (
                  <div key={index}>
                    <TwoColumnBlock
                      key={index}
                      {...block}
                      reverse={index % 2 !== 0}
                    />
                  </div>
                );
            })}
          </div>
        </div>
      </section>
      <section className=" px-[16px] md:px-[40px] py-[40px] md:py-[90px] text-blank">
        <SubTitleLine color="white" title={visibility.sub_title} />
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-center mt-[30px] md:mt-[100px]">
            <AnimatedStrokeByStroke
              text={visibility.title}
            ></AnimatedStrokeByStroke>
          </h2>
          <div className="grid gap-[60px] md:gap-[100px] my-[90px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {visibility.content.map((ele, index) => (
              <div key={index} className=" w-full gap-[40px] ">
                <AnimatedTextLine className="max-[769px]:flex flex-col items-center justify-center">
                  <img src={ele.media.icon_src} className="" />
                </AnimatedTextLine>
                <div className="w-full space-y-[30px]">
                  <h3 className="text-center md:text-left mb-[21px] mt-[21px] md:mt-[45px]">
                    <AnimatedStrokeByStroke text={ele.title} />
                  </h3>
                  <AnimatedTextLine>
                    <p className="text-center md:text-left">
                      {ele.description}
                    </p>
                  </AnimatedTextLine>
                </div>
              </div>
            ))}
          </div>{" "}
          <AnimatedTextLine>
            <p className="large text-center  max-w-[936px] md:text-left mb-[100px] mx-auto">
              {visibility.description}
            </p>{" "}
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
      <section className=" px-[16px] md:px-[40px] text-blank">
        <MoreEvents
          color="transporent"
          flag="event"
          title={latest.title}
          link="/our-owned-events"
        />
      </section>
      <Footer color="rouge" />
    </div>
  );
}

interface TwoColumnBlockProps {
  title: string;
  description: string | string[];
  media_small: {
    image_src: string;
    alt?: string;
  };
  reverse?: boolean;
}

const TwoColumnBlock = ({
  title,
  description,
  media_small,
  reverse = false,
}: TwoColumnBlockProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center justify-between gap-[40px]`}
    >
      {/* Text */}

      <div className="w-full md:w-1/2 ">
        <h2 className="text-[24px] font-[800] mb-[30px] md:mb-[40px]">
          <AnimatedStrokeByStroke text={title} />
        </h2>
        <AnimatedTextLine>
          <p className="text-[16px] leading-[1.5]">{description}</p>
        </AnimatedTextLine>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full md:max-w-max">
          <img
            src={media_small.image_src}
            alt={media_small.alt}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};
