import Image from "next/image";
import AnimatedTextLines from "../typography/AnimatedTextLine";

type SquareIconProps = {
  link: string;
  iconSrc: string;
  title: string;
};

export default function SquareIcons({ link, iconSrc, title }: SquareIconProps) {
  return (
    <a href={link}>
      <AnimatedTextLines stagger={0}>
        <div className="w-[230px] h-[230px] md:w-[260px] md:h-[260px] space-y-[26px] py-[40.5px] px-[60px] bg-white-gris md:bg-white hover:bg-white-gris transition-colors duration-300 ease-in-out">
          <div className="w-[110px] h-[110px] flex items-center justify-center mx-auto">
            <AnimatedTextLines stagger={0.2}>
              <Image
                src={iconSrc}
                alt="Icon"
                width={64}
                height={64}
                className="mx-auto"
              />
            </AnimatedTextLines>
          </div>
          <AnimatedTextLines stagger={0.5}>
            <div className="flex justify-center gap-[15px]">
              <p className="!text-[19px] !leading-[100%] !font-[700] text-center">
                {title}
              </p>
              <img className="md:hidden" src="/assets/icons/arrow.svg" alt="" />
            </div>
          </AnimatedTextLines>
        </div>
      </AnimatedTextLines>
    </a>
  );
}
