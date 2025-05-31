export default function SubTitleLine({ title }: { title: string }) {
  return (
    <div className="w-full flex gap-[24px] py-[35px]">
      <h4 className="text-blue whitespace-nowrap">{title}</h4>
      <span className="w-full h-[1px] bg-blue my-auto"></span>
    </div>
  );
}
