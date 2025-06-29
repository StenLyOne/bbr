"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import Image from "next/image";

import { API_DOMAIN } from "../../../lib/api";
import staticData from "../../../data/team.json";

import { useMediaQuery } from "../../../hooks/useMediaQuery";
import AnimatedTextLine from "../../../components/AnimatedTextLine";

import Footer from "../../../components/sections/Footer";
import Header from "../../../components/sections/Header";
import SubTitleLine from "../../../components/ui/SubTitleLine";
import Button from "../../../components/ui/Button";
import HeroTitleFadeIn from "../../../components/HeroTitleFadeIn";

export default function Team() {
  // ------- DODATO -------
  const [data, setData] = useState<typeof staticData>(staticData);

  useEffect(() => {
  fetch(`${API_DOMAIN}/wp-json/bbr/v1/options/team`, { cache: "no-store" })
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch team: ${res.status}`);
      return res.json();
    })
    .then((json) => {
      const acf = json.acf;
      if (!acf) return;
      setData({
        hero: {
          title: acf.hero_tm?.title_tm ?? "",
          media: {
            image_src: acf.hero_tm?.media_tm?.image_src_tm ?? "",
            alt:       acf.hero_tm?.media_tm?.alt_tm      ?? ""
          }
        },
        intro: acf.intro,
        departments: acf.departments,
        cta: {
          title:            acf.cta?.title            ?? "",
          button: {
            text: acf.cta?.button_text ?? "",
            link: acf.cta?.button_link ?? ""
          },
          background_image: acf.cta?.background_image ?? ""
        },
        
      });
    })
    .catch(console.error);
}, []);

  // -----------------------

  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [hasScrolledTop, setHasScrolledTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);
  const imageRefs = useRef<HTMLImageElement[]>([]);
  const setImageRef = (el: HTMLImageElement | null) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useLayoutEffect(() => {
    if (!imageRefs.current.length) return;

    imageRefs.current.forEach((img) => {
      gsap.fromTo(
        img,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
      requestAnimationFrame(() => {
        setHasScrolledTop(true);
      });
    }
  }, []);

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
    const timeout = setTimeout(() => {
      setShowIntro(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  // --- IZMENJENO: destrukturiramo iz state umesto iz statičkog JSON ---
  const { departments, hero, intro, cta } = data;

  return (
    <>
      <div
        ref={contentRef}
        className={`transition-opacity duration-1000 bg-blank z-[100000] overflow-hidden`}
      >
        <Header animationsReady={animationsReady} />
        <main
          className={`
    transition-opacity duration-1000 w-full h-[100vh] flex items-center justify-center px-[16px] md:px-[40px]  ${
      contentVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
        >
          <div className="w-full flex justify-center md:justify-between items-center">
            <div>
              <HeroTitleFadeIn
                delay={1}
                className={"text-blue text-center md:text-left"}
              >
                {hero.title}
              </HeroTitleFadeIn>
            </div>
            <div>
              <AnimatedTextLine delay={1.1}>
                <Image
                  className="hidden md:block"
                  src={hero.media.image_src}
                  alt={hero.media.alt}
                  width={728}
                  height={326}
                />
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
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M27.5 19H10.67"
                stroke="#21224b"
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
          className="px-[16px] md:px-[40px] bg-white-gris"
        >
          <SubTitleLine title={intro.sub_title} />
          <div className="max-w-[787px] space-y-[50px] pt-[32px] pb-[72px] md:pt-[118px] md:pb-[209px]">
            <AnimatedTextLine>
              <h2 className=" text-blue">{intro.title}</h2>
            </AnimatedTextLine>
            <AnimatedTextLine>
              <p className="text-blue">{intro.description}</p>
            </AnimatedTextLine>
          </div>
        </section>
        <section className="relative w-full bg-blank ">
          <img
            ref={setImageRef}
            className="absolute top-[200px] right-[-0px] md:top-[3%] right-[-500px]
      -translate-x-1/2 -translate-y-1/2 md:scale-[1.5]"
            src="assets/logo/events-border-vector.svg"
            alt=""
          />
          <img
            ref={setImageRef}
            className="absolute top-1/2 right-[-400px]
      -translate-x-1/2 -translate-y-1/2 scale-[1.2]"
            src="assets/logo/pr-border-vector.svg"
            alt=""
          />
          <img
            ref={setImageRef}
            className="absolute bottom-[-400px] md:bottom-[-600px] right-[-400px] md:right-[-560px]
      -translate-x-1/2 -translate-y-1/2 scale-[1.2] z-[0]"
            src="assets/logo/digital-border-vector.svg"
            alt=""
          />
          {isDesktop ? (
            <div className="px-[40px] pb-[155px] flex flex-col">
              {departments.map((department, index) => (
                <div key={index} className="pt-[143px]">
                  <AnimatedTextLine>
                    <h2 className="text-blue mb-[139px]">
                      {department.title}
                    </h2>
                  </AnimatedTextLine>
                  <div className="">
                    <AnimatedTextLine
                      stagger={0.1}
                      className="flex flex-wrap gap-x-[16px] gap-y-[88px] "
                    >
                      {department.members.map((member, idx) => {
                        const width = "w-[328px]";
                        const size = 328;
                        return (
                          <div key={idx} className={`${width} flex flex-col`}>
                            <Image
                              src={member.image_src}
                              alt={member.name}
                              width={size}
                              height={size}
                              className="w-full h-auto object-cover rounded"
                            />
                            <div className="mt-[16px]">
                              <h3 className="text-blue">{member.name}</h3>
                              <p className="text-blue pt-[6px] pb-[26px]">
                                {member.position}
                              </p>
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {/* SVG ikona LinkedIn */}
                                <svg
                                  className="w-[24px] h-[24px]"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  {/* …path data… */}
                                </svg>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </AnimatedTextLine>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-[64px] py-[72px]">
              {departments.map((department, index) => (
                <div key={index}>
                  <AnimatedTextLine>
                    <h2 className="px-[16px] mb-[46px] text-blue ">
                      {department.title}
                    </h2>
                  </AnimatedTextLine>
                  <div className="">
                    <AnimatedTextLine
                      stagger={0.1}
                      className="flex gap-[16px] px-[16px] overflow-x-auto no-scrollbar flex-nowrap"
                      width="full"
                    >
                      {department.members.map((member, idx) => {
                        const isManaging =
                          department.title === "MANAGING DIRECTOR";
                        const width = isManaging
                          ? "max-w-[450px] w-full"
                          : "min-w-[240px]";
                        const size = isManaging ? 300 : 240;
                        return (
                          <div
                            key={idx}
                            className={`${width} flex-shrink-0 flex flex-col`}
                          >
                            <Image
                              src={member.image_src}
                              alt={member.name}
                              width={768}
                              height={768}
                              className="w-full h-auto object-cover rounded"
                            />
                            <div className="mt-[26px]">
                              <h3 className="!font-[900] text-blue">
                                {member.name}
                              </h3>
                              <h4 className="mt-[10px] mb-[16px] !font-[500] text-blue">
                                {member.position}
                              </h4>
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue underline inline-block w-[18px] h-[18px]"
                              >
                                {/* SVG ikona LinkedIn */}
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  {/* …path data… */}
                                </svg>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </AnimatedTextLine>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="relative p-[16px] md:p-[40px] z-[1]">
          <div
            className="w-full h-full min-h-[496px] flex gap-[64px] flex-col items-center md:px-[115px] md:items-start justify-center text-white text-center"
            style={{
              backgroundImage: `url(${cta.background_image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <AnimatedTextLine>
              <h2 className="text-[32px] md:text-left md:text-[48px] font-bold ">
                {cta.title}
              </h2>
            </AnimatedTextLine>
            <Button
  text={cta.button.text}
  link={cta.button.link}
  color={"white"}
/>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
