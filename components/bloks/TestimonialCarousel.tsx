import { useRef, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface Testimonial {
  description: string;
  name: string;
  job: string;
  company: string;

  logo_src: string;
}

interface Props {
  testimonial: Testimonial[];
}

export default function MoreEvents({ testimonial }: Props) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: "left" | "right") => {
    const width = containerRef.current?.offsetWidth || 0;
    if (!containerRef.current) return;

    containerRef.current.scrollBy({
      left: dir === "right" ? width : -width,
      behavior: "smooth",
    });
  };

  return (
    <div className="">
      <div className="mx-auto ">
        <div
          ref={containerRef}
          className="transition-all duration-300 flex gap-[16px] overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {testimonial.map((ele, i) => (
            <div
              key={i}
              className={`snap-start shrink-0 bg-blank p-[24px] md:p-[30px] text-blue ${
                isMobile ? "w-[90vw]" : "w-[calc(33vw-28px)]"
              } flex flex-col gap-[20px]`}
            >
              <div className="w-[200px] h-[160px] relative mx-auto">
                <Image
                  src={ele.logo_src}
                  alt={`icon of ${ele.company}`}
                  fill
                  className=""
                />
              </div>
              <p className="pb-[78px] pt-[30px]">{ele.description}</p>
              <div className="text-blue">
                <h3 className="!font-[900]">{ele.name}</h3>
                <p>{ele.job}</p>
                <p>{ele.company}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center my-[70px] gap-4">
          <button
            onClick={() => scrollBy("left")}
            className="w-[38px] h-[38px] flex items-center justify-center transition-colors duration-300 cursor-pointer hover:brightness-125"
          >
            <Image
              src="/assets/icons/BTN-Main-Positive.svg"
              width={38}
              height={38}
              alt="Prev"
            />
          </button>
          <button
            onClick={() => scrollBy("right")}
            className="w-[38px] h-[38px] flex items-center justify-center transition-colors duration-300 cursor-pointer hover:brightness-125"
          >
            <Image
              src="/assets/icons/BTN-Main-Positive.svg"
              width={38}
              height={38}
              alt="Next"
              className="rotate-180"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
