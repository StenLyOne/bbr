import { useRef, useState } from "react";
import Image from "next/image";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Link from "next/link";
import AnimatedTextLine from "../AnimatedTextLine";

interface Props {
  events: any[]; // массив ивентов
  title: string;
  link: string;
  slug: any[];
  flag: "work" | "event";
}

export default function MoreEvents({ events, title, link, slug, flag }: Props) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleEvents = events.slice(0, 3);

  const scrollBy = (dir: "left" | "right") => {
    const width = containerRef.current?.offsetWidth || 0;
    if (!containerRef.current) return;

    containerRef.current.scrollBy({
      left: dir === "right" ? width : -width,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white-gris py-[75px]">
      <div className="mx-auto px-4 md:px-[40px]">
        <div className="flex justify-between items-end mb-10">
          <AnimatedTextLine>
            <h2 className="text-[32px] font-[900] text-blue">{title}</h2>
          </AnimatedTextLine>
          <Link
            href={link}
            className="hidden md:flex text-blue font-medium items-center gap-2 whitespace-nowrap group hover:text-accent transition-colors duration-300"
          >
            See all events
            <svg
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4297 0.930176L18.4997 7.00018L12.4297 13.0702"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-300"
              />
              <path
                d="M1.5 7H18.33"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-300"
              />
            </svg>
          </Link>
        </div>

        <div
          ref={containerRef}
          className={`transition-all duration-300 ${
            isMobile
              ? "flex flex-col gap-[46px]"
              : "flex gap-[16px] overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar "
          }`}
        >
          {visibleEvents.map((event, i) => (
            <Link
              key={i}
              className="flex flex-col gap-[40px]"
              href={`${
                flag === "event" ? "/our-owned-events/" : "/portfolio/"
              }${slug[i]}`}
            >
              <div
                className={`${
                  isMobile
                    ? "w-full"
                    : "snap-start shrink-0 w-[calc(47.5vw-8px)]" // 2 карточки + 16px gap
                }`}
              >
                <img
                  src={event.hero_image}
                  alt={event.title}
                  className="w-full h-[300px] object-cover"
                />
                <h3 className="text-blue mt-[30px] mb-[20px]">{event.title}</h3>
                <p className="text-blue">{event.event_information.text}</p>
              </div>
            </Link>
          ))}

          <Link
            href={link}
            className="md:hidden flex text-blue font-medium items-center gap-2 whitespace-nowrap group hover:text-accent transition-colors duration-300"
          >
            See all events
            <svg
            
              width="20"
              height="14"
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4297 0.930176L18.4997 7.00018L12.4297 13.0702"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-300"
              />
              <path
                d="M1.5 7H18.33"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-300"
              />
            </svg>
          </Link>
        </div>

        {!isMobile && (
          <div className="flex justify-center my-[70px] gap-4">
            <button
              onClick={() => scrollBy("left")}
              className="w-[38px] h-[38px] flex items-center justify-center transition-colors duration-300 cursor-pointer"
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
              className="w-[38px] h-[38px] transition-colors duration-300 cursor-pointer"
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
        )}
      </div>
    </section>
  );
}
