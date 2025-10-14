"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import EventsDesktop from "../bloks/EventsDesktop";
import EventsMobile from "../bloks/EventsMobile";

export default function Events({ data }: any) {
  const [isClient, setIsClient] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section className="w-full bg-blank overflow-hidden">
      {isDesktop ? (
        <EventsDesktop bbr_events={data} />
      ) : (
        <EventsMobile bbr_events={data} />
      )}
    </section>
  );
}
