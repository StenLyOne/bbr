import SubTitleLine from "../ui/SubTitleLine";

export default function Mission({ data }: { data: any }) {
  return (
    <section className="w-full bg-white-gris">
      <div className="px-[16px] md:px-[40px]">
        <SubTitleLine title={data.sub_title} />
        <p className="large w-full max-w-[902px] mt-[36px] md:mt-[100px] pb-[76px] md:pb-[175px] mx-auto text-blue !lg:font-[28px]">
          {data.content}
        </p>
      </div>
    </section>
  );
}
