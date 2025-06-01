import SubTitleLine from "../ui/SubTitleLine";

export default function Latest(data: any) {
  return (
    <section className="w-full h-screen bg-white-gris">
      <div className="h-[100vh] px-[16px] md:px-[40px]">
        <SubTitleLine title={"Latest"} />
      </div>
    </section>
  );
}
