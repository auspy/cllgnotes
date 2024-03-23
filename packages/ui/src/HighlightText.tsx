import { Highlight } from "@cllgnotes/types";

const HighlightText = ({ texts }: { texts: Highlight["texts"] }) => {
  if (!Array.isArray(texts)) return null;
  return (
    <>
      {texts.map(({ type, value }, i) => (
        <span
          key={i}
          className={`${
            type == "hit" ? "semi p-1 rounded-md bg-lYellow " : " "
          }`}
        >
          {i == texts.length - 1
            ? value.substring(0, 50) + (value.length > 50 ? "..." : "")
            : value}
        </span>
      ))}
    </>
  );
};

export default HighlightText;
