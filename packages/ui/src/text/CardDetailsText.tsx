import { firstLetterUppercase } from "@cllgnotes/lib";
import { CardDetailsBoxProps, TextProps } from "@cllgnotes/types";
import Text from "./Text";
import Link from "next/link";
import { pathDocId } from "@cllgnotes/lib";
import { memo } from "react";

const CardDetailsText = ({
  subject,
  subjectCode,
  year,
  title,
  univ,
  testType,
  _id,
  type,
  href,
  textType,
  allowWrap = false,
}: any) => {
  const detailsTextProps: Partial<TextProps> = {
    textStyle: { height: 16 },
    type: "medi12",
    textTransform: "uppercase",
  };
  const noWrapStyle: React.CSSProperties = allowWrap
    ? {}
    : { whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" };
  // console.log("CARD DETAILS TEXT", title, subject, subjectCode, testType);
  return (
    <>
      <div className="space-y-1">
        {title && <Text {...detailsTextProps}>{subject}</Text>}
        <Text {...detailsTextProps} textTransform="capitalize">
          {type == "notes" ? "📓 Notes" : "📝 Paper"}
        </Text>
        <Text textStyle={{ ...noWrapStyle }} type={textType || "h3"}>
          <Link className="mt5" href={pathDocId(_id, href)}>
            {title
              ? firstLetterUppercase(title)
              : `${
                  testType ? `${testType?.toUpperCase()} - ` : ""
                } ${subject} ${subjectCode ? `- ${subjectCode}` : ""}`}
          </Link>
        </Text>
        <div className="frcsb w100">
          <Text {...detailsTextProps}>
            {(univ || "SRM University") + (year ? ", " + year : "")}
          </Text>
        </div>
      </div>
    </>
  );
};

export default memo(CardDetailsText);
