"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import Link from "next/link";
import { forwardRef } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePointerType } from "../../hooks/usePointerType";
import { useRouter } from "next/navigation";


interface Prop {
  menuFun: Function;
  isOpen: boolean;
}

export default function MenuOverlay({ isOpen, menuFun }: Prop) {
  const router = useRouter();
  const isTouch = usePointerType();
  const overlayRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const servicesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const arrowRef = useRef<(SVGSVGElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!overlayRef.current) return;

    const el = overlayRef.current;

    if (!hasMounted.current) {
      gsap.set(el, {
        y: "-100%",
        opacity: 0,
        pointerEvents: "none",
      });
      hasMounted.current = true;
      return;
    }

    if (isOpen) {
      gsap.set(el, {
        pointerEvents: "auto",
      });
      gsap.to(el, {
        y: "0%",
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      gsap.to(el, {
        y: "-100%",
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(el, { pointerEvents: "none" });
        },
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const refsMap: Record<string, (HTMLParagraphElement | null)[]> = {
      ABOUT: aboutRef.current,
      SERVICES: servicesRef.current,
    };

    const animatedItems = refsMap[activeSection ?? ""] ?? [];

    Object.entries(refsMap).forEach(([key, refs]) => {
      const isActive = key === activeSection;
      gsap.to(refs, {
        y: isActive ? 0 : 30,
        opacity: isActive ? 1 : 0,
        stagger: 0.1,
        duration: 0.4,
        ease: isActive ? "power2.out" : "power2.in",
        overwrite: true,
      });
    });

    arrowRef.current.forEach((arrow, i) => {
      if (!arrow) return;
      const sectionNames = [
        "HOME",
        "ABOUT",
        "SERVICES",
        "PORTFOLIO",
        "CONTACT",
      ];
      const section = sectionNames[i];
      const show = activeSection === section;
      gsap.to(arrow, {
        y: show ? 0 : 30,
        opacity: show ? 1 : 0,
        duration: 0.4,
        ease: show ? "power2.out" : "power2.in",
        overwrite: true,
      });
    });
  }, [activeSection]);

  const toggleSection = (section: string) => {
    setActiveSection((prev) => (prev === section ? null : section));
  };

  const handleHover = (section: string) => {
    setActiveSection(section);
  };

  const handleMouseLeave = (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
    }
  };

  const ArrowIcon = forwardRef<SVGSVGElement>((props, ref) => (
    <svg
      ref={ref}
      width="38"
      height="28"
      viewBox="0 0 38 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0, transform: "translateY(30px)" }}
      {...props}
    >
      <path
        d="M14.14 1.86011L2.00002 14.0001L14.14 26.1401"
        stroke="#6276FB"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 14.0001H2.34"
        stroke="#6276FB"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ));

  

  ArrowIcon.displayName = "ArrowIcon";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-white z-[1000] px-[16px] md:px-[40px] py-[40px] opacity-0 pointer-events-none text-blue"
    >
      <div className="flex flex-col md:justify-between h-full md:items-end space-y-6 text-right justify-end md:pt-[200px]">
        <div className="space-y-[38px] w-full md:w-auto ">
          <div className="flex flex-col items-start md:items-center gap-[21px] md:flex-row pb-[10%] md:pb-[5%]">
            <div className="flex items-center justify-center gap-[8px] cursor-pointer group">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:[&>path]:fill-accent"
              >
                <path
                  d="M47.6258 0.374146L37.5077 21.6893C36.8156 23.1551 36.8156 24.8449 37.5077 26.3107L47.6258 47.6258L26.3107 37.5077C24.8449 36.8156 23.1551 36.8156 21.6893 37.5077L0.374146 47.6258L10.4922 26.3107C11.1844 24.8449 11.1844 23.1551 10.4922 21.6893L0.374146 0.374146L21.6893 10.4922C23.1551 11.1844 24.8449 11.1844 26.3107 10.4922L47.6258 0.374146Z"
                  fill="#21224B"
                  className="transition-colors duration-300"
                />
              </svg>
              <p className="!text-[64px] !font-[900] text-blue transition-colors duration-300 group-hover:text-accent">
                EVENTS
              </p>
            </div>
            <div className="flex items-center justify-center gap-[8px] cursor-pointer group">
              <svg
                width="54"
                height="42"
                viewBox="0 0 54 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-colors duration-300 group-hover:[&>path]:fill-accent"
              >
                <path
                  d="M0.340759 17.3355C0.340759 23.5245 1.60298 28.3901 4.14777 31.9732C6.69256 35.5562 11.0492 38.7118 17.2178 41.4398L21.8799 32.5229C18.0932 30.711 15.467 28.9194 14.0012 27.1279C12.5558 25.3364 11.7414 23.2191 11.5786 20.7965H21.8799V0.539917H0.340759V17.3355Z"
                  fill="#E6E7E8"
                  className="transition-colors duration-300"
                />
                <path
                  d="M49.8523 10.0269C47.3075 6.44385 42.9508 3.28831 36.7822 0.560295L32.1201 9.47725C35.9272 11.2891 38.533 13.0807 39.9988 14.8722C41.4443 16.6637 42.2586 18.781 42.4215 21.2036H32.1201V41.4602H53.6593V24.6646C53.6593 18.4756 52.397 13.61 49.8523 10.0269Z"
                  fill="#E6E7E8"
                  className="transition-colors duration-300"
                />
              </svg>
              <p className="!text-[64px] !font-[900] text-blue transition-colors duration-300 group-hover:text-accent">
                PR
              </p>
            </div>

            <div className="flex items-center justify-center gap-[8px] cursor-pointer group">
              <svg
                width="58"
                height="58"
                viewBox="0 0 58 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.0055 43.1645L21.9163 50.2536L29.0055 57.3428L36.0947 50.2536L29.0055 43.1645Z"
                  fill="#D72529"
                  className="transition-colors duration-300 group-hover:fill-accent"
                />
                <path
                  d="M7.73972 21.9051L0.650543 28.9942L7.73972 36.0834L14.8289 28.9942L7.73972 21.9051Z"
                  fill="#D72529"
                  className="transition-colors duration-300 group-hover:fill-accent"
                />
                <path
                  d="M14.8307 28.9998L29.0036 43.1727L36.0901 36.0862L43.1765 43.1727L57.3494 28.9998L43.1765 14.8269L36.0901 21.9133L43.1765 28.9998L36.0901 36.0862L29.0036 28.9998L36.0901 21.9133L29.0036 14.8269L14.8307 28.9998Z"
                  fill="#D72529"
                  className="transition-colors duration-300 group-hover:fill-accent"
                />
                <path
                  d="M28.9991 0.657104L21.9099 7.74628L28.9991 14.8355L36.0882 7.74628L28.9991 0.657104Z"
                  fill="#D72529"
                  className="transition-colors duration-300 group-hover:fill-accent"
                />
              </svg>
              <p className="!text-[64px] !font-[900] text-blue transition-colors duration-300 group-hover:text-accent">
                DIGITAL
              </p>
            </div>
          </div>

          {[
            { label: "HOME", href: "/" },
            {
              label: "ABOUT",
              items: ["Our Story", "Team", "Our owned events"],
            },
            { label: "SERVICES", items: ["Events", "PR", "Digital"] },
            { label: "PORTFOLIO", href: "/portfolio" },
            { label: "CONTACT", href: "/contact" },
          ].map((section, i) => {
            const hasItems = !!section.items;
            const sectionRefs =
              section.label === "ABOUT"
                ? aboutRef
                : section.label === "SERVICES"
                ? servicesRef
                : null;

            return isDesktop ? (
              <div
                key={section.label}
                className={`flex ${
                  hasItems
                    ? "justify-between items-end"
                    : "items-center justify-end"
                } gap-[10px]`}
                onMouseEnter={
                  !isTouch ? () => handleHover(section.label) : undefined
                }
                onMouseLeave={
                  !isTouch ? () => handleMouseLeave(section.label) : undefined
                }
                onClick={() => {
                  if (hasItems) {
                    toggleSection(section.label);
                  } else if (section.href) {
                    menuFun();
                  }
                }}
              >
                {hasItems && (
                  <div className="flex gap-[30px] overflow-hidden">
                    {section.items.map((text, j) => (
                      <p
                        key={text}
                        ref={(el) => {
                          if (sectionRefs) sectionRefs.current[j] = el;
                        }}
                        className="!font-[600] text-blue hover:text-accent transition-colors duration-300 opacity-0 translate-y-[30px]"
                      >
                        <Link
                          href={`/${text.replace(/\s+/g, "-").toLowerCase()}`}
                          onClick={() => menuFun()}
                        >
                          {text}
                        </Link>
                      </p>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-center gap-[10px] cursor-pointer">
                  <svg
                    ref={(el) => {
                      arrowRef.current[i] = el;
                    }}
                    width="38"
                    height="28"
                    viewBox="0 0 38 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-0 translate-y-[30px]"
                  >
                    <path
                      d="M14.14 1.86011L2.00002 14.0001L14.14 26.1401"
                      stroke="#6276FB"
                      strokeWidth="3"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M36 14.0001H2.34"
                      stroke="#6276FB"
                      strokeWidth="3"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="header hover:text-accent transition-colors duration-300">
                    {section.href ? (
                      <Link href={section.href} onClick={() => menuFun()}>
                        {section.label}
                      </Link>
                    ) : (
                      section.label
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <div
                key={section.label}
                className={`flex ${
                  hasItems
                    ? "justify-between flex-col items-start"
                    : "items-center justify-start"
                } gap-[0px] ${
                  activeSection === section.label ? "gap-[32px]" : "gap-[0px]"
                }`}
                onClick={() => toggleSection(section.label)}
              >
                <div className="flex items-center justify-center gap-[10px] cursor-pointer">
                  <p
                    className={`header ${
                      activeSection === section.label
                        ? "text-accent"
                        : "text-blue"
                    } transition-colors duration-300`}
                  >
                    {section.href ? (
                      <Link href={section.href} onClick={() => menuFun()}>
                        {section.label}
                      </Link>
                    ) : (
                      section.label
                    )}
                  </p>
                </div>

                {hasItems && (
                  <div
                    className={`flex flex-col gap-[16px] overflow-hidden transition-all duration-500 ${
                      activeSection === section.label
                        ? "max-h-[500px]"
                        : "max-h-0"
                    }`}
                  >
                    {section.items.map((text, j) => (
                      <p
                        key={text}
                        ref={(el) => {
                          if (sectionRefs) sectionRefs.current[j] = el;
                        }}
                        className={`!font-[600] text-blue hover:text-accent transition-all duration-300 ${
                          activeSection === section.label
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-[30px] pointer-events-none"
                        }`}
                      >
                        <Link
                          href={`/${text.replace(/\s+/g, "-").toLowerCase()}`}
                          className="flex"
                          onClick={() => menuFun()}
                        >
                          {text}
                        </Link>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="max-w-[228px] max-h-[20px] pt-[50%] md:pt-[0%] flex gap-[24px] items-center justify-center">
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
  );
}
