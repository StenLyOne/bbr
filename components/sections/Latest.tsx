import SubTitleLine from "../ui/typography/SubTitleLine";
import InstagramEmbed from "../ui/media/InstagramEmbed";

type instagramData = {
  instagram_url: string;
  account_name: string;
  avatar: string;
  media: string;
};
interface Props {
  data: {
    sub_title: string;
    instagram_links: instagramData[];
  };
}

export default function Latest({ data }: Props) {

  return (
    <section className="w-full  bg-white-gris py-[40px]">
      <div className="px-[16px] md:px-[40px] w-full h-full">
        <SubTitleLine title={data.sub_title} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {data.instagram_links.map((data, i) => (
            <InstagramEmbed key={i} data={data} />
          ))}
        </div>
      </div>
    </section>
  );
}
