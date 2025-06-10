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
  return (
    <main
      className="relative w-full h-screen overflow-hidden px-[16px] md:px-[40px]"
      data-bg="dark"
    >
      {/* Video */}
      {data.media.type === "video" ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={data.media.src} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={data.media.src}
          width={1440}
          height={3000}
          alt={data.media.alt}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      {/* TITLE */}
      <div className="w-full relative z-10 flex items-center  h-full break-all">
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
