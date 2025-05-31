"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Image from "next/image";

export default function Header() {
  const bbrRef = useRef(null);
  const groupRef = useRef(null);
  const prRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const duckWidth = isDesktop ? 56 : 42;
  const duckHeight = isDesktop ? 55 : 41;
  const logoBBRWidth = isDesktop ? 67 : 50;
  const logoBBRHeight = isDesktop ? 23 : 17;
  const logoGroupWidth = isDesktop ? 59 : 45;
  const logoGroupHeight = isDesktop ? 13 : 9;
  const logoEventsWidth = isDesktop ? 59 : 44;
  const logoEventsHeight = isDesktop ? 4 : 3;

  useEffect(() => {
    const images = [bbrRef.current, groupRef.current, prRef.current];

    // Начальная анимация при загрузке
    gsap.set(images, { y: 30, opacity: 0 });
    gsap.to(images, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.15,
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
        // Скрываем при скролле вниз
        gsap.to(images, {
          y: 30,
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
        });
        isHidden = true;
      } else if (delta < 0 && isHidden) {
        // Показываем при скролле вверх
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
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-1000 px-[16px] md:px-[40px]">
      <div className="w-full py-[30px] md:py-[40px] border-b-1 border-white">
        <div className="flex items-end gap-[10px]">
          <span>
            <Image
              src="/assets/logo/logo-duck.svg"
              width={duckWidth}
              height={duckHeight}
              alt="duck"
            />
          </span>
          <span className="space-y-[4px]">
            <Image
              src="/assets/logo/logo-bbr.svg"
              width={logoBBRWidth}
              height={logoBBRHeight}
              alt="BBR"
              ref={bbrRef}
            />
            <Image
              src="/assets/logo/logo-group.svg"
              width={logoGroupWidth}
              height={logoGroupHeight}
              alt="Group"
              ref={groupRef}
            />
            <Image
              src="/assets/logo/logo-events-pr-digital.svg"
              width={logoEventsWidth}
              height={logoEventsHeight}
              alt="Events"
              ref={prRef}
            />
          </span>
        </div>
      </div>
    </header>
  );
}
