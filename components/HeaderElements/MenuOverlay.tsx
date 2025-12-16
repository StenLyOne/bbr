"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import Link from "next/link";
import { forwardRef } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePointerType } from "../../hooks/usePointerType";
import { useRouter } from "next/navigation";
import { useContactSettings } from "../../hooks/useContactSettings";
import { usePathname } from "next/navigation";
// см. наш хук

interface Prop {
  menuFun: () => void;
  isOpen: boolean;
}

const SmartLink = ({
  href,
  children,
  menuFun,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  menuFun: () => void;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={(e) => {
        if (isActive) {
          e.preventDefault();
          return;
        }
        // menuFun();
      }}
      {...props}
    >
      {children}
    </Link>
  );
};

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
  const pathname = usePathname();

  // new: load social_links
  const contact = useContactSettings(); // { postal_address, copyright, social_links, ... }
  const { status, data, error } = useContactSettings();
  const socialLinks = useMemo(() => data?.social_links ?? [], [data]);

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
        <div className="space-y-[34px] md:space-y-[38px] w-full md:w-auto ">
          <div className="max-[769px]:scale-80 max-[768px]:translate-x-[-30px] max-[768px]:translate-y-[0px]  flex flex-col items-start md:items-center gap-[21px] md:flex-row pb-[0%] md:pb-[5%]">
            <Link
              href="/events"
              className="flex items-center justify-center gap-[8px] cursor-pointer group"
            >
              <div className="w-[58px]">
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
              </div>
              <p className="!text-[64px] !font-[900] text-blue transition-colors duration-300 group-hover:text-accent">
                EVENTS
              </p>
            </Link>
            <Link
              href="/pr"
              className="flex items-center justify-center gap-[8px] cursor-pointer group"
            >
              <div className="w-[58px]">
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
              </div>
              <p className="!text-[64px] !font-[900] text-blue transition-colors duration-300 group-hover:text-accent">
                PR
              </p>
            </Link>

            <Link
              href="/digital"
              className="flex items-center justify-center gap-[8px] cursor-pointer group"
            >
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
            </Link>
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
                className={`flex  ${
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
                    // menuFun();
                  }
                }}
              >
                {hasItems && (
                  <div className="flex gap-[30px] overflow-hidden scale-130">
                    {section.items.map((text, j) => (
                      <p
                        key={text}
                        ref={(el) => {
                          if (sectionRefs) sectionRefs.current[j] = el;
                        }}
                        className="!font-[600] text-blue hover:text-accent transition-colors duration-300 opacity-0 translate-y-[30px] "
                      >
                        <SmartLink
                          href={`/${text.replace(/\s+/g, "-").toLowerCase()}`}
                          menuFun={menuFun}
                        >
                          {text}
                        </SmartLink>
                      </p>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-center gap-[10px] cursor-pointer">
                  {section.label === "ABOUT" || section.label === "SERVICES" ? (
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
                  ) : null}

                  <p className="header hover:text-accent transition-colors duration-300">
                    {section.href ? (
                      <SmartLink href={section.href} menuFun={menuFun}>
                        {section.label}
                      </SmartLink>
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
                  activeSection === section.label ? "gap-[22px]" : "gap-[0px]"
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
                      <SmartLink href={section.href} menuFun={menuFun}>
                        {section.label}
                      </SmartLink>
                    ) : (
                      section.label
                    )}
                  </p>
                </div>

                {hasItems && (
                  <div
                    className={`flex flex-col gap-[10px] md:gap-[16px] overflow-hidden transition-all duration-500 ${
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
                        className={`!font-[600] text-blue hover:text-accent transition-all duration-300 text-left ${
                          activeSection === section.label
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-[30px] pointer-events-none"
                        }`}
                      >
                        <SmartLink
                          href={`/${text.replace(/\s+/g, "-").toLowerCase()}`}
                          menuFun={menuFun}
                        >
                          {text}
                        </SmartLink>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="hidden md:flex max-w-[228px] max-h-[20px] pt-[50%] md:pt-[0%]  gap-[24px] items-center justify-center scale-120 translate-x-[-25px]">
          {status === "ready" && socialLinks.length > 0 && (
            <div className="max-w-[228px] max-h-[20px] pt-[50%] md:pt-[0%] flex gap-[24px] items-center justify-center">
              {socialLinks.map((s, i) => (
                <a
                  key={s.link_url || i}
                  href={s.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-wrapper"
                >
                  <img
                    src={s.icon_url}
                    alt={s.icon_alt || ""}
                    className="w-[20px] h-[20px] object-contain icon-hover"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
