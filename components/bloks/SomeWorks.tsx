import { link } from "fs";
import data from "../../data/portfolio.json";
import Link from "next/link";
import Image from "next/image";

export default function SomeWorks() {
  return (
    <div className="flex flex-col gap-[46px] md:gap-[16px] md:flex-row ">
      {data.works.map((work, index) => (
        index > 2 ? null :
        <Link
        className="w-full md:w-1/3"
          href={`/portfolio/${work.slug.replace(/[^a-z0-9-]/gi, "")}`}
          key={index}
        >
          <Image
            src={work.hero_image}
            alt=""
            width={443}
            height={278}
            className="w-full"
          />
          <h3 className="pt-[30px] pb-[4px]">{work.title}</h3>
          <p>{work.tag}</p>
        </Link>
      ))}
    </div>
  );
}
