import Image from "next/image";
import AnimatedTextLine from "../AnimatedTextLine";

export default function Hero({ data }: { data: any }) {
  return (
    <main className="relative w-full h-screen overflow-hidden px-[16px] md:px-[40px]" data-bg="dark"> 
      {/* Video */}
      {data.video_url ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={data.video_url} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={data.image_url}
          width={1440}
          height={3000}
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      {/* TEXT */}
      <div className="w-full relative z-10 flex items-center  h-full break-all">
        <AnimatedTextLine>
          <h1 className="text-blank max-w-[800px] mt-[272px]">{data.title}</h1>
        </AnimatedTextLine>
      </div>
    </main>
  );
}
