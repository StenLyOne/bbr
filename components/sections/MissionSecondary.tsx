import SubTitleLine from "../ui/SubTitleLine";
import SquareIcons from "../ui/SquareIcons";
import AnimatedTextLine from "../AnimatedTextLine";
import AnimatedTextWordByWord from "../AnimatedTextWordByWord";

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

export default function MissionSecondary({ data }: { data: MissionSecondaryData }) {
  return (
    <section className="w-full bg-white">
      <div className=" md:px-[0px] md:px-[40px]">
        <div className="px-[16px] md:px-[0px]">
          <SubTitleLine title={data.sub_title} />
        </div>
        <AnimatedTextLine>
          <p className="large max-w-[902px] px-[16px] md:px-[0px] mx-auto mt-[32px] mb-[67px] md:mt-[164px] md:mb-[164px] text-blue">
            {data.content}
          </p>
        </AnimatedTextLine>
        <div className="">
          <AnimatedTextLine
            stagger={0.1}
            className="mx-auto max-w-[910px] flex justify-between gap-[14px] pl-[16px] md:pl-[0px] overflow-x-auto scrollbar-hide"
          >
            {data.items.map((item: any, index: number) => (
              <SquareIcons
                key={index}
                link={item.link}
                iconSrc={item.icon}
                title={item.label}
              />
            ))}
          </AnimatedTextLine>
        </div>
        <div className="px-[16px] md:px-[0px] py-[64px] md:py-[164px]">
          <h2 className="!text-[128px] !leading-[122px] !font-[900] text-center text-blue">
            <AnimatedTextWordByWord text={data.title} />
          </h2>
        </div>
      </div>
    </section>
  );
}
