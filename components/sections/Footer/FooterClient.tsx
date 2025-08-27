// components/Footer/FooterClient.tsx
"use client";

import Link from "next/link";
import SubTitleLine from "../../ui/typography/SubTitleLine";
import type { ContactSettings } from "../../../lib/api/contacts/types";

interface Props {
  color?: "black" | "rouge" | string;
  settings: ContactSettings;
}

export default function FooterClient({
  color,
  settings,
}: {
  color?: "black" | "rouge" | string;
  settings: ContactSettings;
}) {
  const { postal_address, copyright, social_links } = settings;

  const isDark = color === "black" || color === "rouge";
  const background = isDark
    ? color === "black"
      ? "bg-blue"
      : "bg-rouge"
    : "bg-blank";
  const textColor = isDark ? "text-blank" : "text-blue";
  const logoSuffix = isDark ? "-white" : "";
  const maskSuffix = isDark ? "-white" : "";
  const lineColor = isDark ? "white" : "black";

  // when we're on a dark bg, invert the SVG icons to white
  const iconFilterStyle: React.CSSProperties = isDark
    ? { filter: "brightness(0) invert(1)" }
    : {};

  return (
    <div className={background}>
      <div className="mx-auto px-[16px] md:px-[40px]">
        <SubTitleLine title="" color={lineColor} />

        <div className="flex md:items-center justify-between flex-col gap-[30px] md:flex-row md:gap-[0px]">
          {/* mobile logo */}
          <div className="block md:hidden">
            <img
              src={`/assets/logo/BBR-Group-Logo-Footer${logoSuffix}.svg`}
              alt="BBR Logo"
            />
          </div>

          {/* address & copyright */}
          <div className="space-y-[10px]">
            <p className={`small ${textColor}`}>{postal_address}</p>
            <div className="flex flex-col md:flex-row gap-[16px]">
              <p className={`small ${textColor}`}>{copyright}</p>
              <Link
                href="/cookies/"
                className={`text-link small-a ${textColor}`}
              >
                Cookies
              </Link>
              <Link
                href="/privacy-policy/"
                className={`text-link small-a ${textColor}`}
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* social icons */}
          <div
            style={
              {
                "--color-blue": isDark ? "#ffffff" : "#0A1C2B",
              } as React.CSSProperties
            }
            className="max-w-[228px] max-h-[20px] flex gap-[24px] items-center"
          >
            {social_links.map((s, i) => (
              <a
                key={i}
                href={s.link_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* apply filter on dark footers */}
                <img
                  src={s.icon_url}
                  alt={s.icon_alt}
                  style={iconFilterStyle}
                  className="h-[15px] w-auto icon-svg"
                />
              </a>
            ))}
          </div>

          {/* desktop logo */}
          <div className="md:block hidden">
            <img
              src={`/assets/logo/BBR-Group-Logo-Footer${logoSuffix}.svg`}
              alt="BBR Logo"
            />
          </div>
        </div>

        {/* bottom mask */}
        <img
          className="mt-[50px] md:mt-[130px] w-full"
          src={`/assets/logo/BBR-Group-Text-Mask${maskSuffix}.svg`}
          alt="BBR Mask"
        />
      </div>
    </div>
  );
}
