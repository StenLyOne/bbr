// components\sections\Mission.tsx

import SubTitleLine from "../ui/typography/SubTitleLine";
import AnimatedTextLines from "../ui/typography/AnimatedTextLine";
import AnimatedStrokeByStroke from "../ui/typography/AnimatedStrokeByStroke";

export default function Mission({ data }: { data: any }) {
  return (
    <section className="w-full bg-white-gris bg-blank">
      <div className="px-[16px] md:px-[40px]">
        <SubTitleLine title={data.sub_title} />
        <div className=" mt-[36px]  md:mt-[100px]  pb-[76px] md:pb-[175px] space-y-6 md:space-y-8">
          {" "}
          <AnimatedTextLines>
            <h2 className="  text-balance text-center  mx-auto text-blue">
            <AnimatedStrokeByStroke text={data.title}/>
            </h2>
          </AnimatedTextLines>
          <AnimatedTextLines>
            <p className="text-balance large md:text-[32px]! md:leading-[40px]! w-full text-center max-w-[1000px]  mx-auto text-blue !lg:font-[28px]">
              {data.content}
            </p>
          </AnimatedTextLines>
        </div>
      </div>
    </section>
  );
}
