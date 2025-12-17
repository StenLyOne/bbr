"use client";

import Image from "next/image";
import Link from "next/link";

import getMediaType from "../utils/getMediaType";
import { useEffect, useRef } from "react";

interface InstagramPostCardProps {
  instagram_url: string; // ссылка на пост в Instagram
  account_name: string; // например @bbrgroup
  avatar: string; // аватар аккаунта (один на аккаунт)
  media: string; // image или video (URL)
  likes: string;
  media_type?: "image" | "video";
  caption?: string;
}

export default function InstagramPostCard({
  data,
}: {
  data: InstagramPostCardProps;
}) {
  const { account_name, avatar, instagram_url, media, likes } = data;
  const mediaType = getMediaType(media);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          // autoplay blocked — silently ignore
        });
      }
    };

    video.load(); // перезагружаем источник
    tryPlay(); // пробуем сразу
    video.addEventListener("canplay", tryPlay); // пробуем, когда готово

    return () => {
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

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
            ref={videoRef}
            src={media}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            preload="auto"
            disablePictureInPicture
          />
        ) : (
          <div className="relative w-full h-full">
            <Image src={media} alt="" fill className="object-cover" />
          </div>
        )}
      </div>
      <div className="px-[10px] py-[10px] space-y-1.5">
        <div className="w-full flex justify-between ">
          {" "}
          <div className="flex gap-4">
            {" "}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.002 4.42621C15.8649 2.73239 18.2779 2.4589 20.0996 3.55414C22.0143 4.7062 23.0205 7.17193 22.4326 9.53851V9.53949C21.8747 11.7872 20.5094 13.6024 18.8506 15.3969C16.8957 17.5117 14.6309 19.2971 12.2539 21.0278C9.20074 18.7952 6.32529 16.5202 4.12109 13.5795L3.67676 12.9643L3.30469 12.4067C2.47642 11.102 1.93051 9.76797 1.90137 8.28754C1.85873 6.12549 3.0417 4.18746 4.76465 3.35687L4.93262 3.27972C6.74193 2.49851 9.00088 2.95331 10.6416 4.56097C10.9634 4.87645 11.2943 5.19448 11.6641 5.55316L12.3145 6.18304L12.9404 5.52972C13.2561 5.20046 13.4912 4.92996 13.7422 4.67621L14.002 4.42621Z"
                stroke="black"
                strokeWidth="1.8"
              />
            </svg>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_2747_11" fill="white">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.4517 17.6305C22.435 15.9834 23 14.0577 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C14.062 23 15.9915 22.4326 17.6409 21.4455L22.8478 22.8407L21.4517 17.6305Z"
                />
              </mask>
              <path
                d="M21.4517 17.6305L19.9062 16.7078C19.6568 17.1255 19.5871 17.6264 19.7131 18.0963L21.4517 17.6305ZM17.6409 21.4455L18.1068 19.7068C17.6362 19.5807 17.1346 19.6508 16.7165 19.901L17.6409 21.4455ZM22.8478 22.8407L22.3819 24.5793C23.0031 24.7458 23.6659 24.5682 24.1206 24.1135C24.5753 23.6587 24.7529 22.996 24.5865 22.3748L22.8478 22.8407ZM21.2 12C21.2 13.7239 20.7276 15.3319 19.9062 16.7078L22.9973 18.5531C24.1425 16.6348 24.8 14.3915 24.8 12H21.2ZM12 2.8C17.081 2.8 21.2 6.91898 21.2 12H24.8C24.8 4.93076 19.0692 -0.8 12 -0.8V2.8ZM2.8 12C2.8 6.91898 6.91898 2.8 12 2.8V-0.8C4.93076 -0.8 -0.8 4.93076 -0.8 12H2.8ZM12 21.2C6.91898 21.2 2.8 17.081 2.8 12H-0.8C-0.8 19.0692 4.93076 24.8 12 24.8V21.2ZM16.7165 19.901C15.3387 20.7256 13.7275 21.2 12 21.2V24.8C14.3965 24.8 16.6443 24.1397 18.5653 22.99L16.7165 19.901ZM17.175 23.1842L22.3819 24.5793L23.3137 21.102L18.1068 19.7068L17.175 23.1842ZM24.5865 22.3748L23.1904 17.1646L19.7131 18.0963L21.1091 23.3065L24.5865 22.3748Z"
                fill="black"
                mask="url(#path-1-inside-1_2747_11)"
              />
            </svg>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2747_18)">
                <path
                  d="M12.1268 20.3059L9.36079 11.2377C9.33084 11.1395 9.28439 11.0472 9.22367 10.965L9.15767 10.8859L2.68394 3.95038L21.5694 3.94999L12.1268 20.3059Z"
                  stroke="black"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2747_18">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.0996 1.90039V21.0781L12.5762 14.8086C12.2424 14.5305 11.7576 14.5305 11.4238 14.8086L3.90039 21.0781L3.90039 1.90039L20.0996 1.90039Z"
              stroke="black"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-[14px] font-bold">{likes} likes</span>
      </div>
    </Link>
  );
}
