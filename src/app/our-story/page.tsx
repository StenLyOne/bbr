"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import data from "../../../data/our-story.json";
import AnimatedTextLine from "../../../components/AnimatedTextLine";

import Footer from "../../../components/sections/Footer";
import Header from "../../../components/sections/Header";
import HeroTitleFadeIn from "../../../components/HeroTitleFadeIn";
import SubTitleLine from "../../../components/ui/SubTitleLine";
import TimelineSection from "../../../components/bloks/TimelineSection";
import TestimonialCarousel from "../../../components/bloks/TestimonialCarousel";

export default function OurStory() {
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

  const { hero, what_we_do, where_we_started, timeline, testimonial } = data;

  return (
    <div
      ref={contentRef}
      className={`transition-opacity duration-1000 bg-blank z-[100000] `}
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
              className={"max-w-[442px] text-blue text-left"}
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
      <section
        data-scroll-target
        className="bg-white-gris px-[16px] md:px-[40px]"
      >
        <SubTitleLine title={what_we_do.sub_title} />
        <div className="flex flex-col md:flex-row gap-[48px] md:gap-[77px] py-[60px] md:py-[130px] max-[1300px]:pl-[0px] pl-[100px]">
          <Image
            className="w-[100%] md:w-[556px] h-[350px]"
            width={556}
            height={350}
            src={what_we_do.media.image_src}
            alt={what_we_do.media.alt}
          />
          <div className="w-full md:w-1/2 text-blue space-y-[36px] md:space-y-[52px]">
            <h2>{what_we_do.title}</h2>
            <p>{what_we_do.description}</p>
          </div>
        </div>
      </section>
      <section className="bg-blank px-[16px] md:px-[40px] ">
        <SubTitleLine title={where_we_started.sub_title} />
        <div className="py-[60px] md:py-[130px] space-y-[120px]">
          <div className="flex flex-col-reverse md:flex-row justify-between gap-[60px] md:gap-[24px] text-blue ">
            <div className="w-full md:w-1/3 space-y-[28px] md:space-y-[50px]">
              <h2>{where_we_started.content[0].title}</h2>
              <div className="space-y-[20px]">
                {where_we_started.content[0].description.map((ele, index) => (
                  <p key={index}>{ele}</p>
                ))}
              </div>
            </div>
            <div className="relative w-full md:w-2/3 h-[500px]">
              <Image
                src={where_we_started.content[0].media.image_src}
                alt={where_we_started.content[0].media.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
          {where_we_started.content.slice(1).map((ele, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-[50px] md:gap-[76px]"
            >
              <div className="relative w-full md:w-2/3 h-[350px] ml-[0px] md:ml-[60px]">
                <Image
                  src={where_we_started.content[0].media.image_src}
                  alt={where_we_started.content[0].media.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-2/3 space-y-[37px]">
                <h3>{ele.title}</h3>
                <div className="space-y-[18px] ">
                  {Array.isArray(ele.description) ? (
                    ele.description.map((text, i) => <p key={i}>{text}</p>)
                  ) : (
                    <p>{ele.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <TimelineSection data={timeline} />
      <section className="bg-white-gris px-[16px] md:px-[40px] ">
        <SubTitleLine title={testimonial.sub_title} />
        <div className="pt-[50px] md:pt-[100px] pb-[40px]">
          <h2 className="mb-[64px] md:mb-[108px] mx-auto text-center text-blue">
            {testimonial.title}
          </h2>
          <TestimonialCarousel testimonial={testimonial.testimonials} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
