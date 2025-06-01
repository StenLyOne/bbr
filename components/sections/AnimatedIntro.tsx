"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import Image from "next/image";

export default function PageIntro({ onFinish }: { onFinish: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // плавное исчезновение интро
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: onFinish,
        });
      },
    });

    // начальная анимация логотипа
    tl.set(containerRef.current, { opacity: 1 });
    tl.fromTo(
      logoRef.current,
      { clipPath: "inset(0 100% 0 0)", opacity: 0 },
      {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      }
    );

    // держим на экране 2 секунды
    tl.to({}, { duration: 2 });
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-blue flex items-center justify-center transition-opacity duration-500"
    >
      <div ref={logoRef} className="w-[200px] h-[100px] relative">
        <Image
          src="/assets/logo/logo-bbr.svg"
          alt="BBR Logo"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
