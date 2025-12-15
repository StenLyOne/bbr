"use client";

import Image from "next/image";
import SubTitleLine from "../ui/typography/SubTitleLine";
import { useState } from "react";
import AnimatedTextLine from "../ui/typography/AnimatedTextLine";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import dynamic from "next/dynamic";
import TitleLines from "../ui/typography/TitleLines";
import AnimatedStrokeByStroke from "../ui/typography/AnimatedStrokeByStroke";

const OwnedEventsDesktop = dynamic(
  () => import("../bloks/OwnedEventsDesktop"),
  {
    ssr: false,
  }
);

interface Stat {
  name: string;
  number: string;
}

interface MediaItem {
  image_src: string;
  logo_src: string;
  alt: string;
}

interface EventItem {
  name: string;
  link: string;
  stats: Stat[];
  media: MediaItem;
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
          <div >
            <SubTitleLine title={data.title} />

            <h2 className="pt-[35px] pb-[54px] text-blue event-title-1 ">
              <AnimatedStrokeByStroke text={data.title} />
            </h2>
          </div>
          <div className="pb-[70px]">
            {data.events.map((event, index) => (
              <div className="" key={index}>
                <AnimatedTextLine>
                  <div
                    className="flex justify-between py-[26px] mx-[16px] border-t-1 border-blue"
                    onClick={() =>
                      setOpenEvent(openEvent === index ? null : index)
                    }
                  >
                    <p className="!font-[700] text-[16px] text-blue">
                      {event.name}
                    </p>
                    <img
                      className={`transition-transform duration-300 ${
                        openEvent === index ? "rotate-90" : "rotate-0"
                      }`}
                      src="/assets/icons/arrow.svg"
                      alt=""
                    />
                  </div>
                </AnimatedTextLine>
                <div
                  className={`bg-blue overflow-hidden transition-all duration-500 ease-in-out ${
                    openEvent === index
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-100"
                  }`}
                >
                  <div className="space-y-[80px]">
                    <AnimatedTextLine>
                      <Image
                        src={event.media.image_src}
                        alt={event.media.alt}
                        width={768}
                        height={765}
                      />
                    </AnimatedTextLine>
                    <AnimatedTextLine>
                      {" "}
                      <img src={event.media.logo_src} alt="" className="mx-auto" />
                    </AnimatedTextLine>
                  </div>
                  <div className="space-y-[50px] py-[80px]">
                    {event.stats.map((stat, index) => (
                      <div
                        key={index}
                        className="text-blank text-center flex flex-col items-center"
                      >
                        <AnimatedTextLine>
                          <h3 className="!text-[40px] !leading-[60px] !font-[900] overflow-hidden">
                            <span className={`translate-y-full`}>
                              {stat.number}
                            </span>
                          </h3>
                        </AnimatedTextLine>
                        <AnimatedTextLine>
                          <p className="small overflow-hidden">
                            <span className={`translate-y-full`}>
                              {stat.name}
                            </span>
                          </p>
                        </AnimatedTextLine>
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
