import Link from "next/link";

interface ButtonProps {
  text: string;
  link: string;
  color: "white" | "black";
}

export default function Button({ text, link, color }: ButtonProps) {
  const baseTextColor = color === "white" ? "text-white" : "text-[#21224B]";
  const baseBorderColor = color === "white" ? "border-white" : "border-[#000000]";
  const svgStrokeColor = color === "white" ? "#FFFFFF" : "#21224B";

  return (
    <Link href={link}>
      <button
        className={`w-[272px] h-[71px] flex gap-[10px] items-center justify-center rounded-[8px] border ${baseBorderColor} ${baseTextColor} 
        hover:bg-[#6276FB] hover:text-white hover:border-transparent transition-all duration-300 group`}
      >
        {text}
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
      </button>
    </Link>
  );
}
