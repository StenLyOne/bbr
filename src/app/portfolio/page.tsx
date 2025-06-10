"use client";
import { gsap, ScrollTrigger } from "../../../lib/gsap";
import Image from "next/image";
import Link from "next/link";
import data from "../../../data/portfolio.json";
import Header from "../../../components/sections/Header";
import Footer from "../../../components/sections/Footer";
import SubTitleLine from "../../../components/ui/SubTitleLine";
import EventCaroursel from "../../../components/bloks/EventCaroursel";
import Button from "../../../components/ui/Button";
import HeroTitleFadeIn from "../../../components/HeroTitleFadeIn";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import AnimatedTextLine from "../../../components/AnimatedTextLine";

export default function Portfolio() {
  const { hero, works } = data;
  const [tags, setTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cardsRef.current[index] = el;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredWorks = works.filter(
    (work) => !activeTag || work.tag === activeTag
  );

  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);
  const paginatedWorks = filteredWorks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const scrollBy = (dir: "left" | "right") => {
    if (dir === "right" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (dir === "left" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const uniqueTags = Array.from(new Set(works.map((work) => work.tag)));
    setTags(uniqueTags);
  }, [works]);

  useLayoutEffect(() => {
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
          trigger: ".grid",
          start: "top 80%",
          once: true,
        },
      }
    );
  }, [paginatedWorks]);

  return (
    <div
      ref={contentRef}
      className={`transition-opacity duration-1000 bg-blank z-[100000] overflow-hidden`}
    >
      <Header animationsReady={animationsReady} />
      <main className="w-full h-[100vh] flex items-center justify-center px-[16px] md:px-[40px]">
        <div className="w-full flex flex-col md:flex-row justify-center md:justify-between gap-[48px]">
          <div>
            <HeroTitleFadeIn
              delay={1}
              className={"text-blue text-left max-w-[450px]"}
            >
              {hero.title}
            </HeroTitleFadeIn>
          </div>
          <AnimatedTextLine delay={1} className="justify-end flex">
            <p className="large max-w-[788px]">{hero.description}</p>
          </AnimatedTextLine>
        </div>
      </main>
      <section className="" data-bg="light">
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
                    className={`w-[200px] md:w-[272px] py-[21px] flex-shrink-0 flex gap-[10px] items-center justify-center rounded-[100px] border border-blue font-semibold transition-all duration-300 group ${
                      activeTag === tag
                        ? "bg-accent text-white"
                        : "bg-blank text-blue hover:bg-blue-200"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[16px] gap-y-[46px]">
          {paginatedWorks.map((work, index) => (
            <div key={index} ref={(el) => setCardRef(el, index)}>
              <Link
                href={`/portfolio/${work.slug.replace(/[^a-z0-9-]/gi, "")}`}
                onClick={() => console.log("[Link] Clicked slug:", work.slug)}
              >
                <Image
                  src={work.hero_image}
                  alt=""
                  width={443}
                  height={278}
                  className="w-full"
                />
                <h3 className="pt-[30px] pb-[4px]">{work.title}</h3>
                <p>{work.tag}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 gap-4">
          <button
            onClick={() => scrollBy("left")}
            className="w-[38px] h-[38px] flex items-center justify-center transition-colors duration-300"
          >
            <Image
              src="/assets/icons/BTN-Main-Positive.svg"
              width={38}
              height={38}
              alt="Prev"
            />
          </button>
          <button
            onClick={() => scrollBy("right")}
            className="w-[38px] h-[38px] transition-colors duration-300"
          >
            <Image
              src="/assets/icons/BTN-Main-Positive.svg"
              width={38}
              height={38}
              alt="Next"
              className="rotate-180 "
            />
          </button>
        </div>
        <div className="flex items-center justify-center py-[50px]">
          <Button text="Let’s Talk" link="/contact" />
        </div>
      </section>
      <Footer />
    </div>
  );
}
