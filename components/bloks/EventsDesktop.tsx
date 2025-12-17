import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import TitleLines from "../ui/typography/TitleLines";

interface Event {
  title: string;
  sub_title: string;
  video: string;
}

interface Props {
  bbr_events: Event[];
}

export default function Events({ bbr_events }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const videos = videoRefs.current;

    const tryPlayAll = () => {
      videos.forEach((video) => {
        if (!video) return;

        const p = video.play();
        if (p !== undefined) {
          p.catch(() => {
            // autoplay заблокирован — игнорируем
          });
        }
      });
    };

    // первая попытка
    tryPlayAll();

    // вторая — когда браузер готов
    videos.forEach((video) => {
      video?.addEventListener("canplay", tryPlayAll);
    });

    return () => {
      videos.forEach((video) => {
        video?.removeEventListener("canplay", tryPlayAll);
      });
    };
  }, []);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
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
    triggers.push(tlCircle.scrollTrigger!);

    tlCircle.fromTo(
      ".circle-1",
      { scale: 0 },
      { scale: 1, ease: "power3.out", duration: 1 }
    );

    const total = bbr_events.length;
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
    triggers.push(tl.scrollTrigger!);

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
        range: [14, 19],
        animation: (duration: number) =>
          gsap.to(".event-title-1", {
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
        range: [39, 44],
        animation: (duration: number) =>
          gsap.to(".event-title-2", {
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
        range: [64, 69],
        animation: (duration: number) =>
          gsap.to(".event-title-3", {
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

    return () => {
      tl.kill();
      triggers.forEach((t) => t?.kill());
      ScrollTrigger.refresh();
    };
  }, [bbr_events.length]);

  return (
    <div className="relative w-full px-[16px] md:px-[40px]">
      <div ref={introRef} className="absolute w-full h-screen ">
        <div
          className="circle-1 absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2  rounded-full bg-blue z-0"
        />
      </div>
      <div
        ref={wrapperRef}
        className={`relative transform: none !important w-full h-screen flex py-[40px] transition-colors duration-500 overflow-visible`}
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

          <svg
            width="1916"
            height="1916"
            viewBox="0 0 1916 1916"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`large-logo-1 absolute w-screen h-auto top-[30%] left-[20%] scale-[1.4]   `}
          >
            <path
              d="M1915.94 0L1505.97 864.273C1477.84 923.577 1477.84 992.423 1505.97 1051.73L1915.94 1916L1051.69 1506.02C992.391 1477.88 923.547 1477.88 864.245 1506.02L0 1916L409.969 1051.73C438.102 992.423 438.102 923.577 409.969 864.273L0.0619323 0L864.307 409.983C923.609 438.116 992.453 438.116 1051.75 409.983L1916 0H1915.94Z"
              fill="#1A1B3E"
            />
          </svg>

          <svg
            width="1556"
            height="1194"
            viewBox="0 0 1556 1194"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`large-logo-2 absolute w-screen h-auto top-[-10%] left-[-28%] scale-110  z-[4] mix-blend-multiply `}
          >
            <g opacity="0.25">
              <path
                d="M0 490.035C0 670.431 37.0604 812.831 111.27 917.188C185.436 1021.55 312.627 1113.68 492.756 1193.65L628.599 933.288C517.819 880.619 441.201 828.172 398.834 776.038C356.422 723.859 332.83 662.181 328.013 591.004H628.599V0H0V490.035Z"
                fill="#BCBEC0"
              />
              <path
                d="M1444.73 276.459C1370.56 172.101 1243.37 79.963 1063.24 0L927.401 260.359C1038.23 313.029 1114.8 365.475 1157.17 417.609C1199.58 469.788 1223.17 531.466 1227.99 602.643H927.401V1193.65H1556V703.612C1556 523.216 1518.94 380.816 1444.73 276.459Z"
                fill="#BCBEC0"
              />
            </g>
          </svg>

          <svg
            width="1994"
            height="1993"
            viewBox="0 0 1994 1993"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`large-logo-3 absolute w-screen h-auto top-[1%] left-[10%] scale-[1.3] z-[6] mix-blend-multiply`}
          >
            <g className="mix-blend-mode:multiply" opacity="0.35">
              <path
                d="M997.434 1494.42L748.055 1743.71L997.434 1993L1246.81 1743.71L997.434 1494.42Z"
                fill="#D72529"
              />
              <path
                d="M249.042 747.79L0 996.743L249.042 1245.7L498.084 996.743L249.042 747.79Z"
                fill="#D72529"
              />
              <path
                d="M1495.69 498.195L1246.29 747.501L1495.69 996.332L1246.29 1245.64L996.898 996.332L1246.29 747.501L996.898 498.671L498.584 996.332L996.898 1494.94L1246.29 1245.64L1495.21 1494.94L1994 996.332L1495.69 498.195Z"
                fill="#D72529"
              />
              <path
                d="M996.75 0L747.708 248.954L996.75 497.907L1245.79 248.954L996.75 0Z"
                fill="#D72529"
              />
            </g>
          </svg>

          {/* RECTANGLE */}
          <div className="rectangle-1 absolute inset-0 w-full h-full bg-blank z-[1] will-change-transform" />
          <div className="rectangle-2 absolute inset-0 w-full h-full bg-blank z-[4] will-change-transform" />
          <div className="rectangle-3 absolute inset-0 w-full h-full bg-blank z-[7] will-change-transform" />
          <div className="w-[45%] h-max absolute flex items-center gap-[16px] z-[2] ">
            <h4 className=" h-[11px]">
              <div className="overflow-hidden">
                <span className="event-line-1 block translate-y-full text-blue">
                  {bbr_events[0].sub_title}
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
                  {bbr_events[1].sub_title}
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
                  {bbr_events[2].sub_title}
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
          <div
            className={`event-image-1
         
              w-1/2 h-full ml-auto absolute inset-0 z-[2]`}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[0] = el;
              }}
              src={bbr_events[0].video}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
          <div
            className={`event-image-2
         
              w-1/2 h-full ml-auto absolute inset-0 z-[4]`}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[0] = el;
              }}
              src={bbr_events[1].video}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
          <div
            className={`event-image-3
         
              w-1/2 h-full ml-auto absolute inset-0 z-[7]`}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[0] = el;
              }}
              src={bbr_events[2].video}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
          {/* lOGO */}
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

        <h2 className="absolute top-1/2 left-[40px] -translate-y-1/2 max-w-[565px] text-left z-[2] space-y-[-3px] text-blue">
          <TitleLines title={bbr_events[0].title} lineClass="event-title-1" />
        </h2>

        {/* TITLE 2 */}
        <h2 className=" absolute top-1/2 left-[40px] -translate-y-1/2 max-w-[565px] text-left z-[5] space-y-[-3px] text-blue">
          <TitleLines title={bbr_events[1].title} lineClass="event-title-2" />
        </h2>

        {/* TITLE 3 */}
        <h2 className="absolute top-1/2 left-[40px] -translate-y-1/2 max-w-[565px] text-left z-[7] space-y-[-3px] text-blue">
          <TitleLines title={bbr_events[2].title} lineClass="event-title-3" />
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
