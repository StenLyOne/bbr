"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

interface GalleryProps {
  images: string[];
}

export default function InfiniteGallery({ images }: GalleryProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const repeatedImages = [...images, ...images, ...images];

  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -100,
        ease: "none",
        duration: 100,
        repeat: -1,
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className=" mx-auto px-4 md:px-[40px] overflow-hidden "
    >
      <div
        ref={trackRef}
        className="flex gap-[16px] w-max scroll-track"
      >
        {repeatedImages.map((img: string, index: number) => (
          <Image
            key={index}
            src={img}
            alt={`gallery-${index}`}
            width={536}
            height={336}
            className="w-[536px] h-[336px] object-cover flex-shrink-0"
          />
        ))}
      </div>
    </section>
  );
}
