// components/bloks/SomeWorks.tsx

import Link from "next/link";
import Image from "next/image";
import { SomeWorkItem } from "../../lib/api/events";

interface SomeWorksProps {
  works: SomeWorkItem[];
}

export default function SomeWorks({ works }: SomeWorksProps) {
  return (
    <div className="flex flex-col gap-[46px] md:gap-[16px] md:flex-row">
      {works.slice(0, 3).map((work) => (
        <Link
          key={work.id}
          href={`/portfolio/${work.slug.replace(/[^a-z0-9-]/gi, "")}`}
          className="w-full md:w-1/3 group"
        >
          <div className="w-full h-[278px] overflow-hidden">
            <Image
              src={work.hero_image.url}
              alt={work.title}
              width={443}
              height={278}
              className="w-full h-[278px] transition-all group-hover:scale-120 duration-200"
            />
          </div>

          <div className="flex pt-[30px] pb-[4px]  justify-between items-center gap-4 ">
            <h3 className="">{work.title}</h3>
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-colors duration-300 rotate-180 min-w-[38px] min-h-[38px] md:hidden"
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
          </div>
          <p>{work.work_type}</p>
        </Link>
      ))}
    </div>
  );
}
