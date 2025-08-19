// src/app/contact/ContactClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger }         from "../../../lib/gsap";
import Image                           from "next/image";

import HeroTitleFadeIn from "../../../components/ui/typography/HeroTitleFadeIn";
import AnimatedTextLines from "../../../components/ui/typography/AnimatedTextLine";
import Header           from "../../../components/sections/Header";
import SubTitleLine from "../../../components/ui/typography/SubTitleLine";
import ContactForm      from "../../../components/sections/ContactForm";
import Footer           from "../../../components/sections/Footer";

import type { ContactData } from "../../../lib/api";

export default function ContactClient({ data }: { data: ContactData }) {
  const {
    contact_hero_title,
    contact_hero_image,
    contact_section_sub_title,
        contact_section_tittle,
        social_tittle,


    contact_info,
    social_links,
    contact_form_labels,
    enquiry_types,
  } = data;

  const [showIntro, setShowIntro]       = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const contentRef                      = useRef<HTMLDivElement>(null);
  const [animationsReady, setAnimationsReady] = useState(false);
   const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
      requestAnimationFrame(() => setShowIntro(false));
    }
  }, []);

  useEffect(() => {
    if (!showIntro && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        onComplete() {
          setContentVisible(true);
          setAnimationsReady(true);
          requestAnimationFrame(() => ScrollTrigger.refresh());
        },
      });
    }
  }, [showIntro]);

  const scrollToNextSection = () => {
    const next = document.querySelector("[data-scroll-target]");
    if (!next) return;
    const top =
      next.getBoundingClientRect().top + window.scrollY - /* your offset */ 142;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      ref={contentRef}
      className="transition-opacity duration-1000 bg-blank z-[100000] opacity-0"
    >
      <Header animationsReady={animationsReady} />

      <main
        className={`
          transition-opacity duration-1000
          w-full h-[100vh]
          flex items-center justify-center
          px-[16px] md:px-[40px]
          ${contentVisible ? "opacity-100" : "pointer-events-none"}
        `}
      >
        <div className="w-full flex justify-center md:justify-between items-center gap-[48px]">
          <div>
            <HeroTitleFadeIn delay={1} className="text-blue text-center md:text-left">
              {contact_hero_title}
            </HeroTitleFadeIn>
          </div>
          <div className="flex items-center flex-col justify-start gap-[4px]">
            <AnimatedTextLines delay={1.1}>
              <Image
                className="hidden md:block"
                src={contact_hero_image.url}
                alt="Contact"
                width={728}
                height={326}
              />
            </AnimatedTextLines>
          </div>
        </div>

        <button
          onClick={scrollToNextSection}
          className="z-1020 absolute md:bottom-[40px] md:left-[40px]
                     bottom-[16px] left-[16px]
                     w-[38px] h-[38px]
                     flex items-center justify-center
                     transition-all duration-300 hover:translate-y-[4px] hover:opacity-80
                     cursor-pointer"
        >
          {/* your exact same SVG */}
          <svg className="rotate-270" width="38" height="38" /* … */>…</svg>
        </button>
      </main>

      <section data-scroll-target className="px-[16px] md:px-[40px]">
        <SubTitleLine title={contact_section_sub_title} />
        <div className="w-full max-w-[1130px] flex justify-between md:flex-row flex-col mx-auto py-[84px] md:py-[100px] gap-[80px]">
          <ContactForm
            labels={contact_form_labels}
            enquiryOptions={enquiry_types}
          />

          <div className="space-y-[64px]">
            <div className="space-y-[44px]">
  <h2 className="text-blue">{contact_section_tittle}</h2>
              <div className="flex flex-col space-y-[12px]">
                <a href={contact_info.phone_link}>{contact_info.phone_number}</a>
                <a href={contact_info.email_link}>{contact_info.email_address}</a>
                <a>{contact_info.postal_address}</a>
              </div>
            </div>
            <div className="space-y-[44px]">
              <h2 className="text-blue">{social_tittle}</h2>
              <div className="flex gap-[24px] items-center">
                {social_links.map((sl, i) => (
                  <a key={i} href={sl.link_url} className="icon-wrapper">
                    <Image
                      src={sl.icon_image.url}
                      alt={sl.icon_image.alt}
                      width={20}
                      height={20}
                       className="transition-all icon-hover"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
