"use client";

import Image from "next/image";
import Link from "next/link";

import getMediaType from "../utils/getMediaType";

interface InstagramPostCardProps {
  instagram_url: string; // ссылка на пост в Instagram
  account_name: string; // например @bbrgroup
  avatar: string; // аватар аккаунта (один на аккаунт)
  media: string; // image или video (URL)
  media_type?: "image" | "video";
  caption?: string;
}

export default function InstagramPostCard({
  data,
}: {
  data: InstagramPostCardProps;
}) {
  const { account_name, avatar, instagram_url, media, caption, media_type } =
    data;
  const mediaType = getMediaType(media);

  return (
    <Link
      href={instagram_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full rounded-[6px] overflow-hidden bg-white transition "
    >
      {/* HEADER */}
      <div className="flex justify-between gap-[10px] px-[10px] py-[10px]">
        <div className="flex items-center gap-2.5">
          {" "}
          <div
            className="w-[36px] h-[36px] rounded-full p-[2px] flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #B92BA0 0%, #FCB35C 100%)",
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <Image
                src={avatar}
                alt={account_name}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <span className="text-[14px] font-bold text-blue">
            {account_name}
          </span>
        </div>
        <button
          // href={instagram_url}
          // target="_blank"
          // rel="noopener noreferrer"
          className="
    inline-flex items-center justify-center
    px-[12px] py-[5px]
    rounded-[6px]
    bg-[#0095F6]
    text-white
    text-[14px] font-bold
    transition-opacity
    hover:opacity-90
    active:opacity-80
    cursor-pointer
  "
        >
          View profile
        </button>
      </div>

      {/* MEDIA */}
      <div className="relative aspect-square overflow-hidden bg-black">
        {mediaType === "video" ? (
          <video
            src={media}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full">
            <Image src={media} alt="" fill className="object-cover" />
          </div>
        )}
      </div>
    </Link>
  );
}
