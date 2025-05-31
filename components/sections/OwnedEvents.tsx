"use client";

import Image from "next/image";
import SubTitleLine from "../ui/SubTitleLine";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, ScrollToPlugin } from "../../lib/gsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import dynamic from "next/dynamic";

const OwnedEventsDesktop = dynamic(() => import("../bloks/OwnedEventsDesktop"), {
  ssr: false,
});

interface Stat {
  name: string;
  number: string;
}

interface EventItem {
  name: string;
  name_mobile: string;
  url: string;
  logo: string;
  image: string;
  stats: Stat[];
}

interface Props {
  data: {
    sub_title: string;
    title: string;
    events: EventItem[];
  };
}

export default function OwnedEvents({ data }: Props) {
  const [openEvent, setOpenEvent] = useState<Number | null>();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  

  return (
    <section className="w-full bg-white relative">
      {isDesktop ? (
        <OwnedEventsDesktop data={data} />
      ) : (
        <div className="w-full">
          <div className=" px-[16px]">
            <SubTitleLine title={data.title} />
            <h2 className="pt-[35px] pb-[54px] text-blue">
              PROUDLY OWNED & PRODUCED
            </h2>
          </div>
          <div className="">
            {data.events.map((event, index) => (
              <div className="" key={index}>
                <div
                  className="flex justify-between py-[26px] mx-[16px] border-t-1 border-blue"
                  onClick={() =>
                    setOpenEvent(openEvent === index ? null : index)
                  }
                >
                  <p className="!font-[700] text-[16px] text-blue">
                    {event.name_mobile}
                  </p>
                  <img
                    className={`transition-transform duration-300 ${
                      openEvent === index ? "rotate-90" : "rotate-0"
                    }`}
                    src="/assets/icons/arrow.svg"
                    alt=""
                  />
                </div>
                <div
                  className={`bg-blue overflow-hidden transition-all duration-500 ease-in-out ${
                    openEvent === index
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-100"
                  }`}
                >
                  <div className="space-y-[80px]">
                    <Image
                      src={event.image}
                      alt={event.name}
                      width={768}
                      height={765}
                    />
                    <img src={event.logo} alt="" className="mx-auto" />
                  </div>
                  <div className="space-y-[50px] py-[80px]">
                    {event.stats.map((stat, index) => (
                      <div
                        key={index}
                        className="text-blank flex flex-col items-center"
                      >
                        <h3 className="!text-[40px] !leading-[60px] !font-[900] overflow-hidden">
                          <span className={`translate-y-full`}>
                            {stat.number}
                          </span>
                        </h3>
                        <p className="small overflow-hidden">
                          <span className={`translate-y-full`}>
                            {stat.name}
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
