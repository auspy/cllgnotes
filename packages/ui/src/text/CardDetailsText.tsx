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
  href,
  allowWrap = false,
}: CardDetailsBoxProps) => {
  const detailsTextProps: Partial<TextProps> = {
    textStyle: { height: 16 },
    type: "medi12",
    textTransform: "uppercase",
  };
  const noWrapStyle: React.CSSProperties = allowWrap
    ? {}
    : { whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" };
  return (
    <>
      <div className="space-y-1">
        {title && <Text {...detailsTextProps}>{subject}</Text>}
        <Text textStyle={{ ...noWrapStyle }} type="h3">
          <Link href={pathDocId(_id, href)}>
            {title
              ? firstLetterUppercase(title)
              : `${
                  testType ? `${testType?.toUpperCase()} - ` : ""
                } ${subject} ${subjectCode ? `- ${subjectCode}` : ""}`}
          </Link>
        </Text>
        <Text {...detailsTextProps}>
          {(univ || "SRM University") + (year ? ", " + year : "")}
        </Text>
      </div>
    </>
  );
};

export default memo(CardDetailsText);
