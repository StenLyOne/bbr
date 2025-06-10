"use client"

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import data from "../../../../data/owned-events.json";
import Header from "../../../../components/sections/Header";
import Footer from "../../../../components/sections/Footer";
import SubTitleLine from "../../../../components/ui/SubTitleLine";
import Button from "../../../../components/ui/Button";

import { useEffect, useRef, useState } from "react";

export default function EventPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState<(typeof data.events)[0] | null>(null);
  const [animationsReady, setAnimationsReady] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log("[EventPage] useParams.slug:", slug);
  console.log("✅ [slug]/page.tsx loaded");

  useEffect(() => {
    console.log("[EventPage] useEffect triggered. Slug:", slug);

    if (typeof slug === "string") {
      const matched = data.events.find((ev) => ev.slug === slug);
      if (matched) {
        console.log("[EventPage] Matching event found:", matched.title);
      } else {
        console.warn("[EventPage] No matching event found for slug:", slug);
      }
      setEvent(matched ?? null);
    } else {
      console.warn("[EventPage] Slug is not a valid string:", slug);
    }

    setLoading(false);
  }, [slug]);

  if (loading) {
    console.log("[EventPage] Loading...");
    return null;
  }

  if (!event) {
    console.error("[EventPage] 404 – Event not found");
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <h1 className="text-3xl">404 – Event not found</h1>
      </div>
    );
  }

  console.log("[EventPage] Rendering event:", event.title);

  return (
    <div className="bg-white text-foreground">
      <Header animationsReady={animationsReady} />

      {/* Hero Section */}
      <main className="relative w-full h-[100vh] overflow-hidden">
        <Image
          src={event.hero_image}
          alt={event.title}
          fill
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-left uppercase">
            {event.title}
          </h1>
        </div>
      </main>

      {/* Info Section */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-[40px] py-16 grid md:grid-cols-2 gap-16">
        <div className="space-y-4">
          <SubTitleLine title="EVENT INFORMATION" />
          <div className="text-sm space-y-2">
            <p>
              <strong>Created & Produced by:</strong> {event.details.created_by}
            </p>
            <p>
              <strong>Yearly Event Since:</strong> {event.details.years}
            </p>
            <p>
              <strong>Budget:</strong> {event.details.budget}
            </p>
            <p>
              <strong>Location:</strong> {event.details.location}
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">{event.description}</h2>
          <p>{event.text}</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-[40px] pb-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {event.gallery.map((img, index) => {
            console.log(`[Gallery] Image ${index}:`, img);
            return (
              <Image
                key={index}
                src={img}
                alt={`gallery-${index}`}
                width={300}
                height={200}
                className="object-cover"
              />
            );
          })}
        </div>
      </section>

      {/* Stats Block */}
      <section className="bg-blue text-white py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[40px]">
          <h2 className="text-2xl font-bold mb-8">{event.stats_block.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {event.stats_block.stats.map((stat, index) => {
              console.log(`[Stats] ${stat.label}:`, stat.value);
              return (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Width Image Block */}
      <section className="relative h-[60vh] w-full">
        <Image
          src={event.video_block.link}
          alt={event.video_block.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-white text-4xl font-bold">
            {event.video_block.title}
          </h2>
        </div>
      </section>

      {/* Sponsors */}
      <section className=" mx-auto px-4 md:px-[40px] py-16">
        <SubTitleLine title="SPONSORS" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mt-8">
          {event.sponsors.map((logo, index) => {
            console.log(`[Sponsor] Logo ${index}:`, logo);
            return (
              <Image
                key={index}
                src={logo}
                alt={`sponsor-${index}`}
                width={120}
                height={60}
                className="object-contain mx-auto"
              />
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className=" mx-auto px-4 md:px-[40px] pb-24 flex flex-wrap gap-4 justify-center">
        {event.cta.map((item, index) => {
          console.log(`[CTA] Button ${index}:`, item.label, item.link);
          return (
            <Link
              key={index}
              href={item.link}
              className="border border-blue text-blue px-6 py-3 font-semibold hover:bg-blue hover:text-white transition"
            >
              {item.label} →
            </Link>
          );
        })}
      </section>

      <Footer />
    </div>
  );
}
