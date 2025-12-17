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
          className="transition-all mb-[40px] md:mb-[70px] duration-300 flex gap-[16px] overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {testimonial.map((ele, i) => (
            <div
              key={i}
              className={`snap-start shrink-0 bg-blank p-[24px] md:p-[30px] text-blue ${
                isMobile ? "w-[90vw]" : "w-[calc(33vw-28px)]"
              } flex flex-col gap-[20px]`}
            >
              {ele.logo_src && (
                <div className="w-[200px] h-[160px] relative mx-auto">
                  <Image
                    src={ele.logo_src}
                    alt={`icon of ${ele.company}`}
                    fill
                    className=""
                  />
                </div>
              )}
              <p className="pb-[78px] pt-[30px]">{ele.description}</p>
              <div className="text-blue">
                <h3 className="!font-[900]">{ele.name}</h3>
                <p>{ele.job}</p>
                <p>{ele.company}</p>
              </div>
            </div>
          ))}
        </div>

        {(isMobile || testimonial.length > 3) && (
          <div className="flex justify-center mb-[40px] md:mb-[70px] gap-4">
            {/* PREV */}
            <button
              onClick={() => scrollBy("left")}
              className={`
        w-[38px] h-[38px]
        flex items-center justify-center
        cursor-pointer
        transition-colors duration-300
        text-blue}
   hover:text-[#6276FB]
      `}
            >
              <ArrowButtonIcon />
            </button>

            {/* NEXT */}
            <button
              onClick={() => scrollBy("right")}
              className={`
        w-[38px] h-[38px]
        flex items-center justify-center
        cursor-pointer
        transition-colors duration-300
        text-blue}
    hover:text-[#6276FB]
      `}
            >
              <div className="rotate-180">
                <ArrowButtonIcon />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const ArrowButtonIcon = () => (
  <svg
    width="38"
    height="38"
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-colors duration-300"
  >
    <rect
      x="0.75"
      y="0.75"
      width="36.5"
      height="36.5"
      rx="18.25"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M16.5703 12.9302L10.5003 19.0002L16.5703 25.0702"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M27.5 19H10.67"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
