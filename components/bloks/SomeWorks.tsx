// components/bloks/SomeWorks.tsx

import Link from "next/link";
import Image from "next/image";
import { SomeWorkItem } from "../../lib/api";

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
          className="w-full md:w-1/3"
        >
          <Image
            src={work.hero_image.url}
            alt={work.title}
            width={443}
            height={278}
            className="w-full"
          />
          <h3 className="pt-[30px] pb-[4px]">{work.title}</h3>
          <p>{work.work_type}</p>
        </Link>
      ))}
    </div>
  );
}
