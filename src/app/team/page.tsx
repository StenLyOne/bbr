"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import Image from "next/image";

import data from "../../../data/team.json";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import AnimatedTextLine from "../../../components/AnimatedTextLine";

import Footer from "../../../components/sections/Footer";
import Header from "../../../components/sections/Header";
import SubTitleLine from "../../../components/ui/SubTitleLine";
import Button from "../../../components/ui/Button";
import HeroTitleFadeIn from "../../../components/HeroTitleFadeIn";

export default function Team() {
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
      // Ждём следующий тик
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
          setAnimationsReady(true); // ✅ запускаем флаг
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        },
      });
    }
  }, [showIntro]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIntro(false); // <-- интро завершается
    }, 500); // через полсекунды

    return () => clearTimeout(timeout);
  }, []);

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
                  src={hero.background_image.src}
                  alt={hero.background_image.alt}
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
                    <h2 className="text-blue mb-[139px]">{department.title}</h2>
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
                                <svg
                                  className="w-[24px] h-[24px]"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.8757 7.17529C13.6148 6.32278 12.9341 5.67385 12.0689 5.45118C11.5599 5.31122 11.0318 5.25396 10.5038 5.27304C9.84215 5.29213 9.19959 5.47027 8.62701 5.79473C8.23893 5.98559 7.9081 6.26552 7.65362 6.61543V5.52116C7.65362 5.36847 7.65362 5.36847 7.50093 5.36847H5.16607C5.01975 5.36847 5.01339 5.36847 5.01339 5.52116V14.3644C5.01339 14.4789 5.0452 14.517 5.15971 14.517H7.6409C7.74905 14.517 7.79358 14.4852 7.78086 14.3771C7.78086 14.3325 7.78086 14.2944 7.78086 14.2498V9.98729C7.78086 9.63102 7.83812 9.28111 7.94627 8.93756C8.23893 8.01507 9.19323 7.48702 10.1284 7.72242C10.6183 7.8433 11.0128 8.21229 11.1591 8.69581C11.3118 9.10297 11.3881 9.52923 11.3754 9.96185V14.3453C11.3754 14.4683 11.439 14.5298 11.5663 14.5298H14.0029C14.1174 14.5298 14.1747 14.4725 14.1747 14.358V9.12206C14.1874 8.46041 14.0856 7.80512 13.882 7.17529H13.8757Z"
                                    fill="#currentColor"
                                  />
                                  <path
                                    d="M3.07297 5.39392H0.598151C0.496359 5.39392 0.445463 5.44694 0.445463 5.55297V14.3453C0.445463 14.5043 0.445463 14.5107 0.610875 14.5107H3.04752C3.16204 14.5107 3.2193 14.4534 3.2193 14.3389L3.23202 9.92367V5.54025C3.23202 5.43846 3.18113 5.38756 3.07934 5.38756L3.07297 5.39392Z"
                                    fill="#currentColor"
                                  />
                                  <path
                                    d="M1.83874 0.469727C0.884442 0.469727 0.108276 1.24589 0.108276 2.20019C0.108276 3.1545 0.884442 3.93066 1.83874 3.93066C2.79304 3.93066 3.56921 3.1545 3.56921 2.20019C3.56921 1.24589 2.79304 0.469727 1.83874 0.469727Z"
                                    fill="#currentColor"
                                  />
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
                                <svg
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M13.8757 7.17529C13.6148 6.32278 12.9341 5.67385 12.0689 5.45118C11.5599 5.31122 11.0318 5.25396 10.5038 5.27304C9.84215 5.29213 9.19959 5.47027 8.62701 5.79473C8.23893 5.98559 7.9081 6.26552 7.65362 6.61543V5.52116C7.65362 5.36847 7.65362 5.36847 7.50093 5.36847H5.16607C5.01975 5.36847 5.01339 5.36847 5.01339 5.52116V14.3644C5.01339 14.4789 5.0452 14.517 5.15971 14.517H7.6409C7.74905 14.517 7.79358 14.4852 7.78086 14.3771C7.78086 14.3325 7.78086 14.2944 7.78086 14.2498V9.98729C7.78086 9.63102 7.83812 9.28111 7.94627 8.93756C8.23893 8.01507 9.19323 7.48702 10.1284 7.72242C10.6183 7.8433 11.0128 8.21229 11.1591 8.69581C11.3118 9.10297 11.3881 9.52923 11.3754 9.96185V14.3453C11.3754 14.4683 11.439 14.5298 11.5663 14.5298H14.0029C14.1174 14.5298 14.1747 14.4725 14.1747 14.358V9.12206C14.1874 8.46041 14.0856 7.80512 13.882 7.17529H13.8757Z"
                                    fill="#currentColor"
                                  />
                                  <path
                                    d="M3.07297 5.39392H0.598151C0.496359 5.39392 0.445463 5.44694 0.445463 5.55297V14.3453C0.445463 14.5043 0.445463 14.5107 0.610875 14.5107H3.04752C3.16204 14.5107 3.2193 14.4534 3.2193 14.3389L3.23202 9.92367V5.54025C3.23202 5.43846 3.18113 5.38756 3.07934 5.38756L3.07297 5.39392Z"
                                    fill="#currentColor"
                                  />
                                  <path
                                    d="M1.83874 0.469727C0.884442 0.469727 0.108276 1.24589 0.108276 2.20019C0.108276 3.1545 0.884442 3.93066 1.83874 3.93066C2.79304 3.93066 3.56921 3.1545 3.56921 2.20019C3.56921 1.24589 2.79304 0.469727 1.83874 0.469727Z"
                                    fill="#currentColor"
                                  />
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
