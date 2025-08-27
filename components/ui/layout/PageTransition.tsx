// src/components/ui/PageTransition.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap } from "../../../lib/gsap";

export default function PageTransition() {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstLoad = useRef(true);

  // стартовое состояние — оверлей за экраном справа
  useEffect(() => {
    gsap.set(overlayRef.current, { xPercent: 100 });
  }, []);

  // анимация при смене маршрута
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return; // не анимируем первый вход
    }

    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power3.inOut" },
    });

    tl.set(overlayRef.current, { xPercent: 100 })
      .to(overlayRef.current, { xPercent: 0 }) // въезд справа, закрывает экран
      .to(overlayRef.current, { xPercent: -100 }, "+=0.1") // уезд налево после короткой паузы
      .set(overlayRef.current, { xPercent: 100 }); // возврат за правый край, готов к следующему переходу

    return () => {
      tl.revert(); // или tl.kill(), но обязательно в блоке { ... }
    };
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-none will-change-transform bg-blue"
      aria-hidden
    />
  );
}
