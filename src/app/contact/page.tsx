"use client";

import HeroTitleFadeIn from "../../../components/HeroTitleFadeIn";
import AnimatedTextLine from "../../../components/AnimatedTextLine";
import Header from "../../../components/sections/Header";
import SubTitleLine from "../../../components/ui/SubTitleLine";
import ContactForm from "../../../components/sections/ContactForm";
import Footer from "../../../components/sections/Footer";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import { useForm } from "react-hook-form";

import data from "../../../data/contact.json";
import Image from "next/image";

const { hero, contact } = data;

export default function Contact({}) {
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [hasScrolledTop, setHasScrolledTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
      // Ждём следующий тик
      requestAnimationFrame(() => {
        setHasScrolledTop(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!showIntro && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          setAnimationsReady(true); // ✅ запускаем флаг
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        },
      });
    }
  }, [showIntro]);

  type FormData = {
    name: string;
    email: string;
    phone?: string;
    enquiry: string;
    message?: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

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

  return (
    <div
      ref={contentRef}
      className={`transition-opacity duration-1000 bg-blank z-[100000] `}
    >
      <Header animationsReady={animationsReady} />
      <main
        className={`
    transition-opacity duration-1000 w-full h-[100vh] flex items-center justify-center px-[16px] md:px-[40px] ${
      contentVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
      >
        <div className="w-full flex justify-center md:justify-between items-center gap-[48px]">
          <div>
            <HeroTitleFadeIn
              delay={1}
              className={"text-blue text-center md:text-left"}
            >
              {hero.title}
            </HeroTitleFadeIn>
          </div>
          <div className="flex items-center flex-col justify-start gap-[4px]">
            <div>
              <AnimatedTextLine delay={1.1}>
                <Image
                  className="hidden md:block"
                  src={hero.image_big.src}
                  alt={hero.image_big.alt}
                  width={728}
                  height={326}
                />
              </AnimatedTextLine>
            </div>
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
      <section data-scroll-target className="px-[16px] md:px-[40px]">
        <SubTitleLine title={contact.sub_titile} />
        <div className="w-full max-w-[1130px] flex justify-between md:flex-row flex-col mx-auto py-[84px] md:py-[100px] gap-[80px]">
          <ContactForm />
          <div className="space-y-[64px]">
            <div className="space-y-[44px]">
              <h2 className="text-blue">Let’s Talk</h2>
              <div className="flex flex-col space-y-[12px]">
                <a href="">+61 283 591 612</a>
                <a href="">bonjour@bbr-group.com</a>
                <a href="">102 George St The Rocks NSW 2000 Australia</a>
              </div>
            </div>
            <div className="space-y-[44px]">
              <h2 className="text-blue">Connect</h2>
              <div className="max-w-[228px] max-h-[20px] flex gap-[24px] items-center">
                <a href="">
                  <svg
                    className="icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.9145 0.117188L11.7526 6.77821C11.5363 7.23628 11.5363 7.76432 11.7526 8.22239L14.9145 14.8834L8.25352 11.7215C7.79545 11.5052 7.2674 11.5052 6.80934 11.7215L0.148315 14.8834L3.31023 8.22239C3.52654 7.76432 3.52654 7.23628 3.31023 6.77821L0.148315 0.117188L6.80934 3.27911C7.2674 3.49542 7.79545 3.49542 8.25352 3.27911L14.9145 0.117188Z"
                      fill="#currentColor"
                    />
                  </svg>
                </a>
                <a href="">
                  <svg
                    className="icon"
                    width="17"
                    height="13"
                    viewBox="0 0 17 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.09021 5.35462C0.09021 7.28867 0.484655 8.80919 1.27991 9.9289C2.07516 11.0486 3.43663 12.0347 5.36432 12.8872L6.82122 10.1007C5.63788 9.53446 4.81718 8.9746 4.35912 8.41474C3.90742 7.85489 3.65294 7.19324 3.60204 6.43616H6.82122V0.105957H0.09021V5.35462Z"
                      fill="#currentColor"
                    />
                    <path
                      d="M15.5626 3.07065C14.7674 1.95094 13.4059 0.964829 11.4782 0.112319L10.0213 2.89888C11.211 3.4651 12.0253 4.02496 12.4834 4.58481C12.9351 5.14467 13.1896 5.80632 13.2405 6.5634H10.0213V12.8936H16.7523V7.64494C16.7523 5.71089 16.3579 4.19037 15.5626 3.07065Z"
                      fill="#currentColor"
                    />
                  </svg>
                </a>
                <a href="">
                  <svg
                    className="icon"
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9323 15.4975L8.43106 17.9988L10.9323 20.5L13.4335 17.9988L10.9323 15.4975Z"
                      fill="#currentColor"
                    />
                    <path
                      d="M3.42921 7.99672L0.927979 10.498L3.42921 12.9992L5.93045 10.498L3.42921 7.99672Z"
                      fill="#currentColor"
                    />
                    <path
                      d="M5.93108 10.5L10.9316 15.5005L13.4319 13.0003L15.9322 15.5005L20.9327 10.5L15.9322 5.49946L13.4319 7.99973L15.9322 10.5L13.4319 13.0003L10.9316 10.5L13.4319 7.99973L10.9316 5.49946L5.93108 10.5Z"
                      fill="#currentColor"
                    />
                    <path
                      d="M10.93 0.5L8.42879 3.00123L10.93 5.50247L13.4313 3.00123L10.93 0.5Z"
                      fill="#currentColor"
                    />
                  </svg>
                </a>
                <a href="">
                  <svg
                    className="icon"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
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
                <a href="">
                  <svg
                    className="icon"
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.48716 5.04644C6.99962 5.01463 4.95741 7.0123 4.9256 9.49985C5.00195 12.0192 7.10777 13.9978 9.62713 13.9151C12.032 13.8387 13.9724 11.9047 14.0424 9.49985C14.0106 7.0123 11.9747 5.01463 9.48716 5.04644ZM9.48716 12.6554C7.71853 12.6872 6.26163 11.2748 6.22982 9.49985C6.29344 7.70576 7.80759 6.29976 9.60168 6.36974C11.3067 6.43336 12.6682 7.80119 12.7318 9.49985C12.7 11.2685 11.2494 12.6745 9.4808 12.6554H9.48716Z"
                      fill="#currentColor"
                    />
                    <path
                      d="M15.0094 0.510327H4.07946C2.03089 0.497603 0.35768 2.15173 0.351318 4.20029V14.7994C0.364042 16.848 2.03089 18.5021 4.07946 18.4894H15.0094C17.058 18.5021 18.7248 16.848 18.7375 14.7994V4.20029C18.7248 2.15173 17.058 0.497603 15.0094 0.510327ZM17.4333 14.7994C17.4206 16.1291 16.3454 17.1979 15.0157 17.1979H4.07946C2.7498 17.1979 1.66825 16.1291 1.66189 14.7994V4.20029C1.67462 2.87063 2.7498 1.80182 4.07946 1.80182H15.0094C16.339 1.80182 17.4206 2.87063 17.427 4.20029V14.7994H17.4333Z"
                      fill="#currentColor"
                    />
                    <path
                      d="M14.6468 3.0933C13.8197 3.0933 13.1453 3.76131 13.139 4.58838C13.1326 5.4218 13.8006 6.10253 14.634 6.1089C15.4675 6.11526 16.1482 5.44725 16.1546 4.61382C16.1546 3.77404 15.4802 3.0933 14.6468 3.0933Z"
                      fill="#currentColor"
                    />
                  </svg>
                </a>
                <a href="">
                  <svg
                    className="icon"
                    width="25"
                    height="17"
                    viewBox="0 0 25 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.5037 2.71055C24.2237 1.6799 23.4158 0.865564 22.3788 0.585635C20.4956 0.0703125 12.9566 0.0703125 12.9566 0.0703125C12.9566 0.0703125 5.41763 0.0703127 3.53448 0.566549C2.52292 0.846478 1.6895 1.6799 1.40957 2.71055C0.91333 4.5937 0.91333 8.49998 0.91333 8.49998C0.91333 8.49998 0.91333 12.4253 1.40957 14.2894C1.6895 15.3201 2.49747 16.1344 3.53448 16.4143C5.43672 16.9296 12.9566 16.9296 12.9566 16.9296C12.9566 16.9296 20.4956 16.9296 22.3788 16.4334C23.4094 16.1535 24.2237 15.3455 24.5037 14.3085C24.9999 12.4253 24.9999 8.51906 24.9999 8.51906C24.9999 8.51906 25.019 4.5937 24.5037 2.71055ZM10.5645 12.1072V4.88635L16.8311 8.49361L10.5645 12.1009V12.1072Z"
                      fill="#currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
