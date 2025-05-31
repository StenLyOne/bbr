import Image from "next/image";

type SquareIconProps = {
  link: string;
  iconSrc: string;
  title: string;
};

export default function SquareIcons({ link, iconSrc, title }: SquareIconProps) {
  return (
    <a href={link}>
      <div className="w-[230px] h-[230px] space-y-[26px] py-[40.5px] px-[60px] bg-white-gris md:bg-white hover:bg-white-gris transition-colors duration-300 ease-in-out">
        <div className="w-[110px] h-[110px] flex items-center justify-center">
          <Image src={iconSrc} alt="Icon" width={64} height={64} />
        </div>
        <p className="!text-[19px] !leading-[100%] !font-[700] text-center">{title}</p>
      </div>
    </a>
  );
}
