"use client";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import EventsDesktop from "../bloks/EventsDesktop";
import EventsMobile from "../bloks/EventsMobile";

export default function Events({ data }: any) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <section className="w-full bg-blank overflow-hidden ">
      {isDesktop ? (
        <EventsDesktop sub_title={data.sub_title} events={data.events} />
      ) : (
        <EventsMobile sub_title={data.sub_title} events={data.events} />
      )}
    </section>
  );
}
