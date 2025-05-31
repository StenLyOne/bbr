import SubTitleLine from "../ui/SubTitleLine";
import SquareIcons from "../ui/SquareIcons";

export default function MissionSecondary({ data }: { data: any }) {
  return (
    <section className="w-full bg-white">
      <div className=" md:px-[0px] md:px-[40px]">
        <div className="px-[16px] md:px-[0px]">
          <SubTitleLine title={data.sub_title} />
        </div>
        <p className="large max-w-[902px] px-[16px] md:px-[0px] mx-auto mt-[32px] mb-[67px] md:mt-[164px] md:mb-[164px]">
          {data.content}
        </p>
        <div className="mx-auto max-w-[910px] flex justify-between gap-[14px] pl-[16px] md:pl-[0px] overflow-x-auto scrollbar-hide">
          {data.items.map((item: any, index: number) => (
            <SquareIcons
              key={index}
              link={item.src}
              iconSrc={item.icon}
              title={item.label}
            />
          ))}
        </div>
        <div className="px-[16px] md:px-[0px] py-[64px] md:py-[164px]">
          <h2 className="!text-[128px] !leading-[122px] !font-[900] text-center text-blue mx-auto w-full">
            {data.title}
          </h2>
        </div>
      </div>
    </section>
  );
}
