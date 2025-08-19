// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import SubTitleLine from "../ui/SubTitleLine";
// import { fetchContactSettings, ContactSettings } from "../../lib/api";

// interface Props {
//   color?: "black" | "rouge" | string;
// }

// export default function Footer({ color }: Props) {
//   const [settings, setSettings] = useState<ContactSettings | null>(null);

//   useEffect(() => {
//     fetchContactSettings()
//       .then(setSettings)
//       .catch(console.error);
//   }, []);

//   if (!settings) return null;
//   const { postal_address, copyright, social_links } = settings;

//   const isDark     = color === "black" || color === "rouge";
//   const background = isDark
//     ? color === "black" ? "bg-blue" : "bg-rouge"
//     : "bg-blank";
//   const textColor  = isDark ? "text-blank" : "text-blue";
//   const logoSuffix = isDark ? "-white" : "";
//   const maskSuffix = isDark ? "-white" : "";
//   const lineColor  = isDark ? "white" : "black";

//   // when we're on a dark bg, invert the SVG icons to white
//   const iconFilterStyle: React.CSSProperties = isDark
//     ? { filter: "brightness(0) invert(1)" }
//     : {};

//   return (
//     <div className={background}>
//       <div className="mx-auto px-[16px] md:px-[40px]">
//         <SubTitleLine title="" color={lineColor} />

//         <div className="flex items-center justify-between flex-col gap-[30px] md:flex-row md:gap-[0px]">
//           {/* mobile logo */}
//           <div className="block md:hidden">
//             <img
//               src={`/assets/logo/BBR-Group-Logo-Footer${logoSuffix}.svg`}
//               alt="BBR Logo"
//             />
//           </div>

//           {/* address & copyright */}
//           <div className="space-y-[10px]">
//             <p className={`small ${textColor}`}>{postal_address}</p>
//             <div className="flex flex-col md:flex-row gap-[16px]">
//               <p className={`small ${textColor}`}>{copyright}</p>
//               <Link href="/cookies/" className={`text-link small-a ${textColor}`}>
//                 Cookies
//               </Link>
//               <Link
//                 href="/privacy-policy/"
//                 className={`text-link small-a ${textColor}`}
//               >
//                 Privacy Policy
//               </Link>
//             </div>
//           </div>

//           {/* social icons */}
//           <div
//             style={{ "--color-blue": isDark ? "#ffffff" : "#0A1C2B" } as React.CSSProperties}
//             className="max-w-[228px] max-h-[20px] flex gap-[24px] items-center"
//           >
//             {social_links.map((s, i) => (
//               <a
//                 key={i}
//                 href={s.link_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {/* apply filter on dark footers */}
//                 <img
//                   src={s.icon_url}
//                   alt={s.icon_alt}
//                   style={iconFilterStyle}
//                   className="h-[15px] w-auto icon-svg"
//                 />
//               </a>
//             ))}
//           </div>

//           {/* desktop logo */}
//           <div className="md:block hidden">
//             <img
//               src={`/assets/logo/BBR-Group-Logo-Footer${logoSuffix}.svg`}
//               alt="BBR Logo"
//             />
//           </div>
//         </div>

//         {/* bottom mask */}
//         <img
//           className="mt-[50px] md:mt-[130px] w-full"
//           src={`/assets/logo/BBR-Group-Text-Mask${maskSuffix}.svg`}
//           alt="BBR Mask"
//         />
//       </div>
//     </div>
//   );
// }

// components/sections/Footer.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SubTitleLine from "../ui/typography/SubTitleLine";
import { fetchContactSettings, ContactSettings } from "../../lib/api";

interface Props {
  color?: "black" | "rouge" | string;
}

export default function Footer({ color }: Props) {
  const [settings, setSettings] = useState<ContactSettings | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchContactSettings().then(setSettings).catch(console.error);
  }, []);

  if (!settings) return null;
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
  const iconBaseColors: ("black" | "white")[] = [
    "black",
    "black",
    "black",
    "black",
    "black",
  ];
  const getFilter = (
    baseColor: "black" | "white",
    hovered: boolean
  ): string => {
    if (hovered) {
      // приблизительно #6276FB
      return "invert(34%) sepia(91%) saturate(1406%) hue-rotate(215deg) brightness(97%) contrast(93%)";
    }
    if (baseColor === "black") {
      return isDark ? "brightness(0) invert(1)" : "none";
    } else {
      return isDark ? "brightness(200%) contrast(1000%)" : "invert(1)";
    }
  };

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
            {social_links.map((s, i) => {
              const baseColor = iconBaseColors[i] || "black";
              const isHovered = hoveredIndex === i;

              return (
                <a
                  key={i}
                  href={s.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={s.icon_url}
                    alt={s.icon_alt}
                    className="h-[15px] w-auto transition-all"
                    style={{
                      filter: getFilter(baseColor, isHovered),
                    }}
                  />
                </a>
              );
            })}
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
