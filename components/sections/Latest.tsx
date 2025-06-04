import SubTitleLine from "../ui/SubTitleLine";
import InstagramEmbed from "../ui/InstagramEmbed";

interface Props {
  data: {
    sub_title: string;
    instagram_links: string[];
  };
}

export default function Latest({ data }: Props) {
  return (
    <section className="w-full min-h-screen bg-white-gris py-[40px]">
      <div className="px-[16px] md:px-[40px]">
        <SubTitleLine title={data.sub_title} />
        <div className="grid grid-cols-1 lg:grid-cols-3 ">
          {data.instagram_links.map((link, i) => (
            <InstagramEmbed key={i} url={link} />
          ))}
        </div>
      </div>
    </section>
  );
}
