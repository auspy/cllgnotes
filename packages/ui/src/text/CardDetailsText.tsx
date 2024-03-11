import { firstLetterUppercase } from "@cllgnotes/lib";
import { TextProps } from "@cllgnotes/types";
import Text from "./Text";
import Link from "next/link";
import { pathDocId } from "@cllgnotes/lib";
import { memo } from "react";

const CardDetailsText = ({
  subject,
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
  // console.log("CARD DETAILS TEXT", title, subject, testType);
  const detailsTextProps: Partial<TextProps> = {
    textStyle: { height: 16 },
    type: "medi12",
    textTransform: "uppercase",
  };
  const noWrapStyle: React.CSSProperties = allowWrap
    ? {}
    : {
        // whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        maxWidth: "400px",
      };
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
              : ` ${subject.name} ${
                  subject?.code &&
                  subject?.code
                    .substring(0, subject?.name?.length || 0)
                    ?.toLowerCase() != subject?.name?.toLowerCase()
                    ? `: ${subject.code}`
                    : ""
                } ${testType ? `: ${testType?.toUpperCase()} : ` : ""}`}
          </Link>
        </Text>
        <div className="frcsb w100">
          <Text {...detailsTextProps}>
            {(univ?.name || "SRM University") + (year ? ", " + year : "")}
          </Text>
        </div>
      </div>
    </>
  );
};

export default memo(CardDetailsText);
