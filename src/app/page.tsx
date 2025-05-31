"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

import data from "../../data/home.json";
import Header from "../../components/sections/Header";
import Hero from "../../components/sections/Hero";
import Mission from "../../components/sections/Mission";
import Events from "../../components/sections/Events";
import MissionSecondary from "../../components/sections/MissionSecondary";
import OwnedEvents from "../../components/sections/OwnedEvents";
import Partners from "../../components/sections/Partners";
import Latest from "../../components/sections/Latest";
import Footer from "../../components/sections/Footer";

export default function Home() {
  useEffect(() => {
    gsap.to(".page-content", {
      y: "50vh",
      ease: "none",
      scrollTrigger: {
        trigger: ".footer-trigger",
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });
    ScrollTrigger.refresh();
  }, []);

  return (
    <div>
      <Header />
      <div className="page-content">
        <Hero data={data.hero} />
        <Mission data={data.mission} />
      </div>
      <div>
        <Events data={data.bbr_events} />
      </div>

      <div className="page-content">
        <MissionSecondary data={data.mission_secondary} />
      </div>

      <div>
        <OwnedEvents data={data.owned_events} />
      </div>

      <div className="page-content">
        <Partners data={data.partners} />
        <Latest data={data.latest} />
      </div>

      <div className="footer-trigger h-[100vh]" />

      <footer className="fixed bottom-0 left-0 w-full z-[-1]">
        <Footer />
      </footer>
    </div>
  );
}
