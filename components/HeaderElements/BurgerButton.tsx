"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "../../lib/gsap";

interface BurgerButtonProps {
  onToggle: () => void;
  // color: boolean;
}

export default function BurgerButton({ onToggle }: BurgerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);
  const lineColor =  "bg-black";

  const toggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    animate(newState);
    onToggle();
  };

  const animate = (open: boolean) => {
    const [s1, s2, s3, s4] = spansRef.current;

    if (!s1 || !s2 || !s3 || !s4) return;

    if (open) {
      gsap.to(s1, { top: 6, width: "0%", left: "50%", duration: 0.3 });
      gsap.to(s2, { rotate: 45, duration: 0.3 });
      gsap.to(s3, { rotate: -45, duration: 0.3 });
      gsap.to(s4, { top: 6, width: "0%", left: "50%", duration: 0.3 });
    } else {
      gsap.to(s1, { top: 0, width: "100%", left: 0, duration: 0.3 });
      gsap.to(s2, { rotate: 0, duration: 0.3 });
      gsap.to(s3, { rotate: 0, duration: 0.3 });
      gsap.to(s4, { top: 12, width: "100%", left: 0, duration: 0.3 });
    }
  };

  return (
    <button
      onClick={toggle}
      className="w-auto h-auto relative z-[1001] flex items-center justify-center"
      aria-label="Toggle menu"
    >
      <div className="relative w-[30px] h-[20px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            ref={(el: HTMLSpanElement | null) => {
              spansRef.current[i] = el;
            }}
            className={`${lineColor} absolute left-0 w-full h-[2px] block`}
            style={{
              top: `${i === 0 ? 0 : i === 1 || i === 2 ? 6 : 12}px`,
            }}
          />
        ))}
      </div>
    </button>
  );
}
