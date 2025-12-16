import Image from "next/image";
import AnimatedTextLines from "../typography/AnimatedTextLine";
import Link from "next/link";

type SquareIconProps = {
  link: string;
  iconSrc: string;
  title: string;
};

export default function SquareIcons({ link, iconSrc, title }: SquareIconProps) {
  return (
    <Link href={link} className="group">
      <AnimatedTextLines stagger={0}>
        <div className="flex flex-col items-center justify-center gap-10 w-[230px] h-[230px] md:w-[300px] md:h-[300px]  py-[40.5px] px-[60px] bg-white-gris md:bg-white hover:bg-white-gris transition-colors duration-300 ease-in-out">
          <div className="w-max group-hover:scale-140 transition-all">
            <AnimatedTextLines stagger={0.2}>
              <Image
                src={iconSrc}
                alt="Icon"
                width={64}
                height={64}
                className=""
              />
            </AnimatedTextLines>
          </div>
          <AnimatedTextLines stagger={0.5}>
            <div className="flex justify-center gap-[15px] group-hover:scale-140 transition-all">
              <p className="!text-[19px] !leading-[100%] !font-[700] text-center ">
                {title}
              </p>
              <img className="md:hidden" src="/assets/icons/arrow.svg" alt="" />
            </div>
          </AnimatedTextLines>
        </div>
      </AnimatedTextLines>
    </Link>
  );
}
