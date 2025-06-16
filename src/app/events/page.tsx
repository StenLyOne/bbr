"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import data from "../../../data/event.json";
import AnimatedTextLine from "../../../components/AnimatedTextLine";

import Footer from "../../../components/sections/Footer";
import Button from "../../../components/ui/Button";
import Header from "../../../components/sections/Header";
import HeroTitleFadeIn from "../../../components/HeroTitleFadeIn";
import SubTitleLine from "../../../components/ui/SubTitleLine";
import TimelineSection from "../../../components/bloks/TimelineSection";
import EventCaroursel from "../../../components/bloks/EventCaroursel";
import AnimatedStrokeByStroke from "../../../components/AnimatedStrokeByStroke";
import SomeWorks from "../../../components/bloks/SomeWorks";

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

  const { hero, management, carousel, services, some_of_our_work } = data;
  return (
    <div
      ref={contentRef}
      className={`transition-opacity duration-1000 bg-blue z-[100000] `}
    >
      <Header animationsReady={animationsReady} />
      <main
        data-bg="dark"
        className="w-full h-[100vh] flex items-center justify-center px-[16px] md:px-[40px] text-blank"
      >
        <div className="w-full flex gap-[46px] justify-center flex-col md:flex-row md:justify-between items-start">
          <div>
            <HeroTitleFadeIn
              delay={1}
              className={"max-w-[600px] text-blank text-left"}
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
      <section
        data-scroll-target
        className=" text-blank px-[16px] md:px-[40px] "
      >
        <SubTitleLine color="white" title={management.sub_title} />
        <div className="pt-[50px] space-y-[90px]">
          <div className="space-y-[30px] max-w-[787px]">
            <h2>{management.title}</h2>
            <p>{management.description}</p>
          </div>
          <div className="flex gap-[22px]">
            <div className="relative w-2/3 h-[500px]">
              <Image
                src={management.media_large.image_src}
                alt={management.media_large.alt}
                fill
                className="object-cover"
              ></Image>
            </div>
            <div className="relative w-1/3 h-[500px]">
              <Image
                src={management.media_large.image_src}
                alt={management.media_large.alt}
                fill
                className="object-cover"
              ></Image>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10">
              {/* Левая колонка — изображения */}
              <div className="flex flex-col gap-[80px]">
                {management.content.map((block, i) =>
                  block.media_small ? (
                    <div key={i} className="relative w-[443px] h-[494px]">
                      <Image
                        src={block.media_small.image_src}
                        alt={block.media_small.alt}
                        width={443}
                        height={498}
                        className=" object-cover"
                      />
                    </div>
                  ) : (
                    <div key={i} className="h-[300px]" /> // Заглушка если нет картинки
                  )
                )}
              </div>

              {/* Правая колонка — текст и заголовки */}
              <div className="flex flex-col gap-[80px]">
                {management.content.map((block, i) => (
                  <div key={i} className="space-y-4">
                    <h2 className="text-[32px] font-bold text-white">
                      {block.title}
                    </h2>
                    {typeof block.description === "string" ? (
                      <p className="text-white text-base leading-relaxed">
                        {block.description}
                      </p>
                    ) : (
                      block.description.map((para: string, idx: number) => (
                        <p
                          key={idx}
                          className="text-white text-base leading-relaxed"
                        >
                          {para}
                        </p>
                      ))
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="space-y-[100px] text-blank">
        <AnimatedStrokeByStroke
          text={carousel.title}
          className="!text-[128px] !leading-[129px] text-center !font-[900] px-[16px] md:px-[40px] "
        ></AnimatedStrokeByStroke>
        <EventCaroursel images={carousel.gallery} />
      </section>
      <section className=" px-[16px] md:px-[40px] py-[90px] text-blank">
        <SubTitleLine color="white" title={services.sub_title} />
        <h2>
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
            color="white"
          />
        </div>
      </section>
      <section className=" px-[16px] md:px-[40px] pb-[51px] text-blank">
        <h2 className="pb-[46px]">{some_of_our_work.title}</h2>
        <SomeWorks />
      </section>
      <Footer color="black" />
    </div>
  );
}
