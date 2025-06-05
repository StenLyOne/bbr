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
    "w-[272px] h-[71px] flex gap-[10px] items-center justify-center rounded-[8px] border font-semibold transition-all duration-300 group";
  const baseBorderColor =
    color === "white" ? "border-white" : "border-[#1a1a3f]";
  const baseTextColor = color === "white" ? "text-white" : "text-[#1a1a3f]";
  const svgStrokeColor = color === "white" ? "#FFFFFF" : "#21224B";

  const content = (
    <>
      {text}
      {arrow ? (
        <svg
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.4297 0.930176L18.4997 7.00018L12.4297 13.0702"
            stroke={svgStrokeColor}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:stroke-white transition-colors duration-300"
          />
          <path
            d="M1.5 7H18.33"
            stroke={svgStrokeColor}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:stroke-white transition-colors duration-300"
          />
        </svg>
      ) : null}
    </>
  );

  if (link) {
    return (
      <Link href={link}>
        <button
          className={`${base} ${baseBorderColor} ${baseTextColor} hover:bg-[#6276FB] hover:text-white hover:border-transparent`}
        >
          {content}
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${base} ${baseBorderColor} ${baseTextColor} hover:bg-[#6276FB] hover:text-white hover:border-transparent`}
    >
      {content}
    </button>
  );
}
