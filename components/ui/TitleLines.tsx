interface TitleLinesProps {
  title: string;
  lineClass: string;
}

export default function TitleLines({ title, lineClass }: TitleLinesProps) {
  return (
    <>
      {title.split("|").map((line, i) => (
        <div key={i} className="overflow-hidden">
          <span className={`${lineClass} block translate-y-full`}>
            {line}
          </span>
        </div>
      ))}
    </>
  );
}
