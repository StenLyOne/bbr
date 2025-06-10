import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import TitleLines from "../ui/TitleLines";

interface EventMedia {
  type: "image" | "video";
  src: string;
  alt: string;
}

interface Event {
  title: string;
  bbr_events_logo: string;
  bbr_events_vector: string;
  bbr_events_media: EventMedia;
}

interface Props {
  sub_title: string;
  events: Event[];
}

export default function Events({ sub_title, events }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tlCircle = gsap.timeline({
      scrollTrigger: {
        trigger: introRef.current,
        start: "10% center",
        end: "bottom top",
        scrub: true,
        // onLeave: () => {
        //   gsap.set(".circle-1", { scale: 10 });
        // },
      },
    });

    tlCircle.fromTo(
      ".circle-1",
      { scale: 0 },
      { scale: 1, ease: "power3.out", duration: 1 }
    );

    const total = events.length;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${total * 2000}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    const steps = [
      // {
      //   range: [-5, 0],
      //   animation: (duration: number) =>
      //     gsap.fromTo(
      //       ".circle-1",
      //       { scale: 0, zIndex: 0 },
      //       { scale: 1, duration, zIndex: 0 }
      //     ),
      // },
      {
        range: [4, 10],
        animation: (duration: number) =>
          gsap.fromTo(
            ".large-logo-1",
            { opacity: 0, y: 0 },
            { opacity: 1, y: 0, duration }
          ),
      },
      {
        range: [10, 15],
        animation: (duration: number) =>
          gsap.fromTo(
            ".rectangle-1",
            { scaleX: 0, transformOrigin: "right center" },
            { scaleX: 1, duration }
          ),
      },
      {
        range: [15, 20],
        animation: (duration: number) =>
          gsap.fromTo(
            ".event-image-1",
            { clipPath: "inset(0 0 0 100%)", opacity: 1 },
            { clipPath: "inset(0 0 0 0%)", opacity: 1, duration }
          ),
      },
      {
        range: [15, 20],
        animation: (duration: number) =>
          gsap.to(".event-line-1", {
            y: 0,
            opacity: 1,
            duration,
            ease: "power4.out",
            stagger: 1,
          }),
      },
      {
        range: [15, 20],
        animation: (duration: number) =>
          gsap.fromTo(
            ".line-1",
            { clipPath: "inset( 0 100% 0 0 )", opacity: 1 },
            { clipPath: "inset( 0 0% 0 0 )", opacity: 1, duration }
          ),
      },
      {
        range: [20, 25],
        animation: (duration: number) =>
          gsap.fromTo(
            ".large-logo-1",
            { opacity: 1, y: 0 },
            { opacity: 0, y: 0, duration }
          ),
      },

      // === EVENT 2 ===
      {
        range: [25, 30],
        animation: (duration: number) =>
          gsap.fromTo(".circle-2", { scale: 0 }, { scale: 1, duration }),
      },
      {
        range: [25, 30],
        animation: (duration: number) =>
          gsap.fromTo(
            ".small-logo-2",
            { opacity: 0 },
            { opacity: 1, duration }
          ),
      },
      {
        range: [28, 35],
        animation: (duration: number) =>
          gsap.fromTo(
            ".large-logo-2",
            { opacity: 0, y: 0 },
            { opacity: 1, y: 0, duration }
          ),
      },
      {
        range: [35, 40],
        animation: (duration: number) =>
          gsap.fromTo(
            ".rectangle-2",
            { scaleX: 0, transformOrigin: "right center" },
            { scaleX: 1, duration }
          ),
      },
      {
        range: [40, 45],
        animation: (duration: number) =>
          gsap.fromTo(
            ".event-image-2",
            { clipPath: "inset(0 0 0 100%)", opacity: 1 },
            { clipPath: "inset(0 0 0 0%)", opacity: 1, duration }
          ),
      },
      {
        range: [40, 45],
        animation: (duration: number) =>
          gsap.to(".event-line-2", {
            y: 0,
            opacity: 1,
            duration,
            ease: "power4.out",
            stagger: 1,
          }),
      },
      {
        range: [40, 45],
        animation: (duration: number) =>
          gsap.fromTo(
            ".line-2",
            { clipPath: "inset( 0 100% 0 0 )", opacity: 1 },
            { clipPath: "inset( 0 0% 0 0 )", opacity: 1, duration }
          ),
      },
      {
        range: [45, 50],
        animation: (duration: number) =>
          gsap.fromTo(
            ".large-logo-2",
            { opacity: 1, y: 0 },
            { opacity: 0, y: 0, duration }
          ),
      },

      // === EVENT 3 ===
      {
        range: [50, 55],
        animation: (duration: number) =>
          gsap.fromTo(".circle-3", { scale: 0 }, { scale: 1, duration }),
      },
      {
        range: [50, 55],
        animation: (duration: number) =>
          gsap.fromTo(
            ".small-logo-3",
            { opacity: 0 },
            { opacity: 1, duration }
          ),
      },
      {
        range: [53, 60],
        animation: (duration: number) =>
          gsap.fromTo(
            ".large-logo-3",
            { opacity: 0, y: 0 },
            { opacity: 1, y: 0, duration }
          ),
      },
      {
        range: [60, 65],
        animation: (duration: number) =>
          gsap.fromTo(
            ".rectangle-3",
            { scaleX: 0, transformOrigin: "right center" },
            { scaleX: 1, duration }
          ),
      },
      {
        range: [65, 70],
        animation: (duration: number) =>
          gsap.fromTo(
            ".event-image-3",
            { clipPath: "inset(0 0 0 100%)", opacity: 1 },
            { clipPath: "inset(0 0 0 0%)", opacity: 1, duration }
          ),
      },
      {
        range: [65, 70],
        animation: (duration: number) =>
          gsap.to(".event-line-3", {
            y: 0,
            opacity: 1,
            duration,
            ease: "power4.out",
            stagger: 1,
          }),
      },
      {
        range: [65, 70],
        animation: (duration: number) =>
          gsap.fromTo(
            ".line-3",
            { clipPath: "inset( 0 100% 0 0 )", opacity: 1 },
            { clipPath: "inset( 0 0% 0 0 )", opacity: 1, duration }
          ),
      },
      {
        range: [70, 75],
        animation: (duration: number) =>
          gsap.fromTo(
            ".large-logo-3",
            { opacity: 1, y: 0 },
            { opacity: 0, y: 0, duration }
          ),
      },
    ];

    function percentToTime(percent: number, totalDuration: number) {
      return (percent / 100) * totalDuration;
    }

    const totalScrollDuration = total * 30;
    tl.duration(totalScrollDuration);

    steps.forEach(({ range, animation }) => {
      const [startP, endP] = range;
      const start = percentToTime(startP, totalScrollDuration);
      const duration = percentToTime(endP - startP, totalScrollDuration);
      const anim = animation(duration); // 👈 передаём в анимацию
      tl.add(anim, start);
    });
    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative w-full px-[16px] md:px-[40px]">
      <div ref={introRef} className="absolute w-full h-screen ">
        <div
          className="circle-1 absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] rounded-full bg-blue z-0"
        />
      </div>
      <div
        ref={wrapperRef}
        className={`relative w-full h-screen flex py-[40px] transition-colors duration-500 overflow-visible`}
      >
        <div
          className={`relative w-full h-full flex p-[40px] transition-colors duration-500 overflow-visible`}
        >
          {/* CIRCLE */}
          <div
            className="circle-1 absolute top-1/2 left-1/2 
                -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] rounded-full bg-blue z-0"
          />
          <div
            className="circle-2 absolute top-1/2 left-1/2 
                -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] rounded-full bg-white-gris z-3"
          />
          <div
            className="circle-3 absolute top-1/2 left-1/2 
                -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] rounded-full bg-rouge z-6"
          />
          {/* LARGE LOGO */}
          <img
            src="/assets/logo/bbr-events-vector.svg"
            alt={events[0].bbr_events_media.alt}
            className={`large-logo-1 absolute top-[110%] left-[75%] scale-[1.5] -translate-x-1/2 -translate-y-1/2 `}
          />
          <img
            src="/assets/logo/bbr-pr-vector.svg"
            alt={events[1].bbr_events_media.alt}
            className={`large-logo-2 absolute top-[45%] left-[25%] scale-[1.2] -translate-x-1/2 -translate-y-1/2 z-[4] mix-blend-multiply`}
          />
          <Image
            src="/assets/logo/bbr-digital-vector.svg"
            width={2000}
            height={2000}
            alt={events[2].bbr_events_media.alt}
            className={`large-logo-3 absolute top-[70%] left-[60%] scale-[1.5] -translate-x-1/2 -translate-y-1/2 z-[6] mix-blend-multiply`}
          />
          {/* RECTANGLE */}
          <div className="rectangle-1 absolute inset-0 w-full h-full bg-blank z-[1] will-change-transform" />
          <div className="rectangle-2 absolute inset-0 w-full h-full bg-blank z-[4] will-change-transform" />
          <div className="rectangle-3 absolute inset-0 w-full h-full bg-blank z-[7] will-change-transform" />
          <div className="w-[45%] h-max absolute flex items-center gap-[16px] z-[2] ">
            <h4 className=" h-[11px]">
              <div className="overflow-hidden">
                <span className="event-line-1 block translate-y-full text-blue">
                  EVENTS
                </span>
              </div>
            </h4>
            <div className="line-1 w-full h-[1px] bg-blue z-[3]"></div>
            <h4 className="h-[11px]">
              <div className="overflow-hidden">
                <span className="event-line-1 block translate-y-full text-blue">
                  01
                </span>
              </div>
            </h4>
          </div>
          <div className="w-[45%] h-max absolute flex items-center gap-[16px] z-[5] ">
            <h4 className=" h-[11px]">
              <div className="overflow-hidden">
                <span className="event-line-2 block translate-y-full text-blue">
                  EVENTS
                </span>
              </div>
            </h4>
            <div className="line-2 w-full h-[1px] bg-blue z-[3]"></div>
            <h4 className="h-[11px]">
              <div className="overflow-hidden">
                <span className="event-line-2 block translate-y-full text-blue">
                  02
                </span>
              </div>
            </h4>
          </div>
          <div className="w-[45%] h-max absolute flex items-center gap-[16px] z-[7] ">
            <h4 className="h-[11px]">
              <div className="overflow-hidden">
                <span className="event-line-3 block translate-y-full text-blue">
                  EVENTS
                </span>
              </div>
            </h4>
            <div className="line-3 w-full h-[1px] bg-blue z-[3]"></div>
            <h4 className="h-[11px]">
              <div className="overflow-hidden">
                <span className="event-line-3 block translate-y-full text-blue">
                  03
                </span>
              </div>
            </h4>
          </div>
          {/* IMAGE */}
          {events.map((event, index) => (
            <div
              key={index}
              className={`event-image-${
                index + 1
              } w-1/2 h-full ml-auto absolute inset-0 z-[${2 + index * 3}]`}
            >
              {event.bbr_events_media.type === "video" ? (
                <video
                  src={event.bbr_events_media.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <Image
                  src={event.bbr_events_media.src}
                  width={680}
                  height={936}
                  alt={event.bbr_events_media.alt}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
          ÷{/* lOGO */}
          <Image
            src="/assets/logo/bbr-events-logo.svg"
            width={250}
            height={150}
            alt="bbr logo"
            className={`small-logo-1 absolute top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] z-[1]`}
          />
          <Image
            src="/assets/logo/bbr-pr-logo.svg"
            width={250}
            height={150}
            alt="bbr logo"
            className={`small-logo-2 absolute top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] z-[3]`}
          />
          <Image
            src="/assets/logo/bbr-digital-logo.svg"
            width={250}
            height={150}
            alt="bbr logo"
            className={`small-logo-3 absolute top-1/2 left-1/2 
              -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] z-[6]`}
          />
          <Image
            src="/assets/images/bbr-events-image.png"
            alt="placeholder"
            width={680}
            height={936}
            className="opacity-0"
          />
        </div>

        <h2 className="event-title-1 absolute top-1/2 left-[80px] -translate-y-1/2 max-w-[565px] text-left z-[2] space-y-[-3px] text-blue">
          <TitleLines title={events[0].title} lineClass="event-line-1" />
        </h2>

        {/* TITLE 2 */}
        <h2 className="event-title-2 absolute top-1/2 left-[80px] -translate-y-1/2 max-w-[565px] text-left z-[5] space-y-[-3px] text-blue">
          <TitleLines title={events[1].title} lineClass="event-line-2" />
        </h2>

        {/* TITLE 3 */}
        <h2 className="event-title-3 absolute top-1/2 left-[80px] -translate-y-1/2 max-w-[565px] text-left z-[7] space-y-[-3px] text-blue">
          <TitleLines title={events[2].title} lineClass="event-line-3" />
        </h2>
        {/* <h2
            className={`event-title-1 absolute top-1/2 -translate-y-1/2 max-w-[565px] text-left z-[2]`}
          >
            {events[0].title}
          </h2> */}
        {/* <h2
            className={`event-title-2 absolute top-1/2 -translate-y-1/2 max-w-[565px] text-left transition-opacity duration-300`}
          >
            {events[1].title}
          </h2>
          <h2
            className={`event-title-3 absolute top-1/2 -translate-y-1/2 max-w-[565px] text-left transition-opacity duration-300`}
          >
            {events[2].title}
          </h2> */}
      </div>
    </div>
  );
}
