"use client";

import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/sections/Header";
import Footer from "../../../components/sections/Footer";
import SubTitleLine from "../../../components/ui/SubTitleLine";
import EventCaroursel from "../../../components/bloks/EventCaroursel";
import Button from "../../../components/ui/Button";
import HeroTitleFadeIn from "../../../components/HeroTitleFadeIn";
import AnimatedTextLine from "../../../components/AnimatedTextLine";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import type { PortfolioSettings, SimpleWork } from "../../../lib/api";

interface Props {
  settings: PortfolioSettings;
  works: SimpleWork[];
}

export default function PortfolioClient({ settings, works }: Props) {
  const [showIntro, setShowIntro] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      if (el) cardsRef.current[index] = el;
    },
    []
  );

  // Tags & filter
  const [tags, setTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Collect unique tags
  useEffect(() => {
    const uniqueTags = Array.from(new Set(works.map((w) => w.work_type)));
    setTags(uniqueTags);
  }, [works]);

  // Filter & paginate
  const filteredWorks = works.filter(
    (w) => !activeTag || w.work_type === activeTag
  );
  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);
  const paginatedWorks = filteredWorks.slice(0, currentPage * itemsPerPage);

  // GSAP cards animation
  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      if (!cardsRef.current.length) return;

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: {
            amount: 1,
            grid: "auto",
            from: "start",
          },
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });
  }, [paginatedWorks]);

  // Fade-in content
  useEffect(() => {
    if (!showIntro && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          setContentVisible(true);
          setAnimationsReady(true); // Set animationsReady after content fade-in
          requestAnimationFrame(() => {
            ScrollTrigger.refresh(); // Refresh ScrollTrigger after animations
          });
        },
      });
    }
  }, [showIntro]);

  // Intro timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowIntro(false); // End intro after 500ms
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  // Scroll helper
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

  // Unpack settings
  const { hero_port } = settings;

  return (
    <div
      ref={contentRef}
      className={`transition-opacity duration-1000 bg-blank z-[100000] overflow-hidden`}
    >
      <Header animationsReady={animationsReady} />
      <main
        className={`
          transition-opacity duration-1000 relative w-full h-[100vh] 
          flex items-center justify-center px-[16px] md:px-[40px]
          ${contentVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="w-full flex flex-col md:flex-row justify-center md:justify-between gap-[48px]">
          <div>
            <HeroTitleFadeIn
              delay={1}
              className={"text-blue text-left max-w-[450px]"}
            >
              {hero_port.title_port}
            </HeroTitleFadeIn>
          </div>
          <AnimatedTextLine delay={1} className="justify-end flex">
            <p className="large max-w-[788px]">{hero_port.description_port}</p>
          </AnimatedTextLine>
        </div>
        <button
          onClick={scrollToNextSection}
          className="z-100 absolute md:bottom-[40px] md:left-[40px] bottom-[16px] left-[16px] w-[38px] h-[38px] flex items-center justify-center transition-all duration-300 hover:translate-y-[4px] hover:opacity-80 cursor-pointer"
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
      <section data-scroll-target className="" data-bg="light">
        <div className="overflow-x-auto">
          <div className="">
            {tags.length > 0 && (
              <AnimatedTextLine
                stagger={0.2}
                className="flex gap-[19px] flex-nowrap min-w-max p-[16px] md:p-[40px]"
              >
                {tags.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={`w-[200px] md:w-[272px] py-[21px] flex-shrink-0 flex gap-[10px] items-center justify-center rounded-[100px] border border-blue font-semibold transition-all duration-300 group cursor-pointer ${
                      activeTag === tag
                        ? "bg-accent text-white"
                        : "bg-blank text-blue hover:bg-accent hover:text-white"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </AnimatedTextLine>
            )}
          </div>
        </div>
      </section>
      <section className="bg-white-gris px-[16px] md:px-[40px] py-[36px]">
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[16px] gap-y-[46px]"
        >
          {paginatedWorks.map((work, index) => (
            <div key={`${work.slug}-${index}`} ref={setCardRef(index)}>
              <Link
                href={`/portfolio/${work.slug.replace(/[^a-z0-9-]/gi, "")}`}
                onClick={() => console.log("[Link] Clicked slug:", work.slug)}
              >
                <Image
                  src={work.media.hero_image}
                  alt={work.title}
                  width={443}
                  height={278}
                  className="w-full h-[278] object-cover"
                />
                <h3 className="pt-[30px] pb-[4px]">{work.title}</h3>
                <p>{work.work_type}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-[32px] items-center justify-center py-[100px]">
          {totalPages > 1 && currentPage < totalPages && (
            <div onClick={() => setCurrentPage((prev) => prev + 1)}>
              <Button text="Load More" arrow={false} />
            </div>
          )}
          <div>
            <Button text="Let’s Talk" link="/contact" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
