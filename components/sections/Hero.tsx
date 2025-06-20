import Image from "next/image";
import AnimatedTextLine from "../AnimatedTextLine";
import HeroTitleFadeIn from "../../components/HeroTitleFadeIn";

export default function Hero({
  data,
  animationsReady,
}: {
  data: any;
  animationsReady: boolean;
}) {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector("[data-scroll-target]");
    if (nextSection) {
      const offset = 142;
      const top =
        nextSection.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  return (
    <main
      style={{ backfaceVisibility: "hidden" }}
      className="fix-gpu relative w-full h-screen  px-[16px] md:px-[40px] bg-blank"
      data-bg="dark"
    >
      {/* SCROLL BUTTON */}
      <button
        onClick={scrollToNextSection}
        className="z-1020 absolute md:bottom-[40px] md:left-[40px] bottom-[16px] left-[16px] w-[38px] h-[38px] flex items-center justify-center transition-all duration-300 hover:translate-y-[4px] hover:opacity-80 cursor-pointer"
      >
        <svg
          className="rotate-270"
          width="38"
          height="38"
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.75"
            y="0.75"
            width="36.5"
            height="36.5"
            rx="18.25"
            stroke="#FFF"
            strokeWidth="1.5"
          />
          <path
            d="M16.5703 12.9302L10.5003 19.0002L16.5703 25.0702"
            stroke="#FFF"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27.5 19H10.67"
            stroke="#FFF"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* BACKGROUND */}
      {data.media?.type === "video" ? (
        data.media.src.endsWith(".mp4") ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ contain: "layout paint", transform: "translateZ(0)" }}
          >
            <source src={data.media.src} type="video/mp4" />
          </video>
        ) : (
          <iframe
            src={`${data.media.src}?autoplay=1&muted=1&loop=1&background=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ transform: "translateZ(0)" }}
          />
        )
      ) : (
        <Image
          src={data.media.src}
          width={3500}
          height={3500}
          alt={data.media.alt || ""}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ transform: "translateZ(0)" }}
        />
      )}

      {/* TITLE */}
      <div className="w-full relative z-10 flex items-center h-full break-all">
        {animationsReady ? (
          <HeroTitleFadeIn
            delay={1}
            className={"text-blank max-w-[800px] mt-[100px]"}
          >
            {data.title}
          </HeroTitleFadeIn>
        ) : (
          <div></div>
        )}
      </div>
    </main>
  );
}
