import Link from "next/link";

interface ButtonProps {
  text: string;
  link?: string; // сделай link необязательным
  color?: "white" | "black";
  type?: "button" | "submit";
  arrow?: boolean;
}

export default function Button({
  text,
  color = "black",
  link,
  type = "button",
  arrow = true,
}: ButtonProps) {
  const base =
    "w-[272px] h-[71px] flex gap-[10px] items-center justify-center rounded-[8px] border-[2px] font-semibold transition-all duration-300 group";
  const baseBorderColor =
    color === "white" ? "border-white" : "border-[#1a1a3f]";

  const svgStrokeColor = color === "white" ? "#FFFFFF" : "#21224B";
  const hoverStroke =
    svgStrokeColor !== "#FFFFFF" ? "group-hover:stroke-white" : "";
  const baseTextColor = color === "white" ? "text-white" : "text-[#21224B]";
  const baseHoverText = "hover:text-white";

  const content = (
    <>
      <span className="z-10">{text}</span>
      {arrow && (
        <svg
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-colors duration-300"
        >
          <path
            d="M12.4297 0.930176L18.4997 7.00018L12.4297 13.0702"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.5 7H18.33"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  if (link) {
    return (
      <Link href={link}>
        <button
          className={`${base} ${baseBorderColor} ${baseTextColor} ${baseHoverText} hover:bg-[#6276FB] hover:border-transparent cursor-pointer`}
        >
          {content}
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${base} ${baseBorderColor} ${baseTextColor} ${baseHoverText} hover:bg-[#6276FB] hover:border-transparent cursor-pointer`}
    >
      {content}
    </button>
  );
}
