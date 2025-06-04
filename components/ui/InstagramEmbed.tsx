"use client";

type InstagramEmbedProps = {
  url: string; // обычная ссылка, которую вводят в WP
};

export default function InstagramEmbed({ url }: InstagramEmbedProps) {
  const extractInstagramId = (link: string): string | null => {
    const match = link.match(/(?:instagram\.com\/(?:reel|p)\/)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const id = extractInstagramId(url);

  if (!id) return <p className="text-red-500">Invalid Instagram URL</p>;

  return (
    <div className="aspect-[9/16] w-full max-w-[400px] mx-auto rounded overflow-hidden">
      <iframe
        src={`https://www.instagram.com/reel/${id}/embed`}
        className="w-full h-full"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
