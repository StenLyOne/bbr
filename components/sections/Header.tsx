"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useHeaderBgDetection } from "../ui/utils/IntersectionObserver";

import BurgerButton from "../HeaderElements/BurgerButton";
import MenuOverlay from "../HeaderElements/MenuOverlay";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const headerRef = useRef<HTMLElement | null>(null);
  const path = usePathname()

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

  const duckWidth = isDesktop ? 62 : 42;
  const duckHeight = isDesktop ? 61 : 41;
  const logoBBRWidth = isDesktop ? 74 : 50;
  const logoBBRHeight = isDesktop ? 25 : 17;
  const logoGroupWidth = isDesktop ? 65 : 45;
  const logoGroupHeight = isDesktop ? 14 : 9;
  const logoEventsWidth = isDesktop ? 65 : 44;
  const logoEventsHeight = isDesktop ? 5 : 3;

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

  useEffect(() => {
    if (!headerRef.current) return;

    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const showHeader = () => {
      gsap.to(headerRef.current, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const hideHeader = () => {
      gsap.to(headerRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    const clearIdle = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = null;
    };

    const armIdle = () => {
      clearIdle();
      idleTimer = setTimeout(() => {
        // если вернулись на верх — не прячем
        if (window.scrollY === 0) return;
        // если меню открыто — тоже не прячем (опционально)
        if (!menuOpen) return;
        hideHeader();
      }, 3000);
    };

    const onScroll = () => {
      // на самом верху всегда показываем и не запускаем таймер
      if (window.scrollY === 0) {
        showHeader();
        clearIdle();
        return;
      }

      // ниже верха: показали и запустили отсчёт
      showHeader();
      armIdle();
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // стартовое состояние
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearIdle();
    };
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-1001 px-[16px] md:px-[40px]"
        ref={headerRef}
        style={{
          backgroundColor: !isDark && path != "/pr" ? "#fff"  : "transparent", // 👈 динамический фон
        }}
      >
        <div
          className={`w-full flex items-center justify-between py-[30px] md:py-[40px]`}
          // style={{
          //   borderBottom: !isDark ? `` : `1px solid ${borderColor}`,
          // }}
        >
          <Link href={"/"} className="cursor-pointer">
            <div className="flex items-end gap-[10px] scale-120 translate-x-3 md:translate-x-4">
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
          </Link>
          <BurgerButton
            onToggle={() => setMenuOpen((prev) => !prev)}
            color={isDark}
          />
        </div>
      </header>
      <MenuOverlay isOpen={menuOpen} menuFun={() => setMenuOpen(false)} />
    </>
  );
}
