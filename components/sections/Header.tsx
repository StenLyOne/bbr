"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useHeaderBgDetection } from "../../components/IntersectionObserver";

import BurgerButton from "../HeaderElements/BurgerButton";
import MenuOverlay from "../HeaderElements/MenuOverlay";

import Image from "next/image";

export default function Header({
  animationsReady,
}: {
  animationsReady?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBg, setShowBg] = useState(false);
  const isDarkBackground = useHeaderBgDetection();
  const bbrRef = useRef(null);
  const groupRef = useRef(null);
  const prRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isDark = !menuOpen && isDarkBackground;

  const logoDuck = isDark
    ? "/assets/logo/logo-duck-light.svg"
    : "/assets/logo/logo-duck-dark.svg";

  const logoBBR = isDark
    ? "/assets/logo/logo-bbr-light.svg"
    : "/assets/logo/logo-bbr-dark.svg";

  const logoGroup = isDark
    ? "/assets/logo/logo-group-light.svg"
    : "/assets/logo/logo-group-dark.svg";

  const logoEvents = isDark
    ? "/assets/logo/logo-events-pr-digital-light.svg"
    : "/assets/logo/logo-events-pr-digital-dark.svg";

  const borderColor = isDark ? "#fff" : "#21224b";

  const duckWidth = isDesktop ? 56 : 42;
  const duckHeight = isDesktop ? 55 : 41;
  const logoBBRWidth = isDesktop ? 67 : 50;
  const logoBBRHeight = isDesktop ? 23 : 17;
  const logoGroupWidth = isDesktop ? 59 : 45;
  const logoGroupHeight = isDesktop ? 13 : 9;
  const logoEventsWidth = isDesktop ? 59 : 44;
  const logoEventsHeight = isDesktop ? 4 : 3;

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      setShowBg(scrollTop > 10); // показываем фон, если прокрутили вниз
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {


    const images = [bbrRef.current, groupRef.current, prRef.current];

    gsap.set(images, { y: 30, opacity: 0 });
    gsap.to(images, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.15,
      delay: 0.8,
    });

    let lastY = window.scrollY;
    let ticking = false;
    let isHidden = false;

    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (Math.abs(delta) < 2) {
        ticking = false;
        return;
      }

      if (delta > 0 && !isHidden) {
        gsap.to(images, {
          y: 30,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
        });
        isHidden = true;
      } else if (delta < 0 && isHidden) {
        gsap.to(images, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
        });
        isHidden = false;
      }

      lastY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // 👈 обязательно добавь зависимость

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-1001 px-[16px] md:px-[40px]"
        style={{
          backgroundColor: !isDark ? "#fff" : "transparent", // 👈 динамический фон
        }}
      >
        <div
          className={`w-full flex items-center justify-between py-[30px] md:py-[40px]`}
          style={{
            borderBottom: !isDark
              ? ``
              : `1px solid ${borderColor}`,
          }}
        >
          <div className="flex items-end gap-[10px]">
            <span>
              <Image
                src={logoDuck}
                width={duckWidth}
                height={duckHeight}
                alt="duck"
              />
            </span>
            <span className="space-y-[4px]">
              <Image
                src={logoBBR}
                width={logoBBRWidth}
                height={logoBBRHeight}
                alt="BBR"
                ref={bbrRef}
              />
              <Image
                src={logoGroup}
                width={logoGroupWidth}
                height={logoGroupHeight}
                alt="Group"
                ref={groupRef}
              />
              <Image
                src={logoEvents}
                width={logoEventsWidth}
                height={logoEventsHeight}
                alt="Events"
                ref={prRef}
              />
            </span>
          </div>
          <BurgerButton
            onToggle={() => setMenuOpen((prev) => !prev)}
            color={isDark}
          />
        </div>
      </header>
      <MenuOverlay isOpen={menuOpen} menuFun={() => setMenuOpen(false)}/>
    </>
  );
}
