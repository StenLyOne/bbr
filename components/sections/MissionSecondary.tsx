import SubTitleLine from "../ui/typography/SubTitleLine";
import SquareIcons from "../ui/icons/SquareIcons";
import AnimatedTextWordByWord from "../ui/typography/AnimatedTextWordByWord";
import AnimatedTextLines from "../ui/typography/AnimatedTextLine";

interface MissionSecondaryItem {
  icon: string;
  label: string;
  link: string;
}

interface MissionSecondaryData {
  title: string;
  sub_title: string;
  content: string;
  items: MissionSecondaryItem[];
}

export default function MissionSecondary({
  data,
}: {
  data: MissionSecondaryData;
}) {
  return (
    <section className="w-full bg-blank">
      <div className=" md:px-[0px] md:px-[40px]">
        <div className="px-[16px] md:px-[0px]">
          <SubTitleLine title={data.sub_title} />
        </div>
        <AnimatedTextLines>
          <p className="text-balance large md:text-[32px]! md:leading-[40px]!  text-center max-w-[902px] px-[16px] md:px-[0px] mx-auto mt-[32px] mb-[67px] md:mt-[164px] md:mb-[164px] text-blue">
            {data.content}
          </p>
        </AnimatedTextLines>
        <div className="">
          <AnimatedTextLines
            stagger={0.1}
            className="mx-auto  flex justify-start md:justify-center gap-4 md:gap-10 pl-[16px] md:pl-[0px] overflow-x-auto scrollbar-hide"
          >
            {data.items.map((item: any, index: number) => (
              <SquareIcons
                key={index}
                link={item.link}
                iconSrc={item.icon}
                title={item.label}
              />
            ))}
          </AnimatedTextLines>
        </div>
        <div className="px-[46px] md:px-[0px] py-[64px] md:py-[164px]">
          <h2 className="text-[100px]! leading-[90px]! md:text-[128px]! md:leading-[122px]! !font-[900] text-center text-blue">
            <AnimatedTextWordByWord text={data.title}/>
          </h2>
        </div>
      </div>
    </section>
  );
}
