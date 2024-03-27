import { firstLetterUppercase } from "@cllgnotes/lib";
import { TextProps, Highlight } from "@cllgnotes/types";
import Text from "./Text";
import Link from "next/link";
import { pathDocId } from "@cllgnotes/lib";
import { memo } from "react";
import CardDetailsHeading from "./CardDetailsHeading";
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
  course,
  allowWrap = false,
  highlights,
}: any) => {
  // ? no need to highlight headings. inspired from google
  // console.log("CARD DETAILS TEXT", title, subject, testType);
  let courseHighlight: Highlight["texts"] = [];
  let subjectHighlight: Highlight["texts"] = [];
  let titleHighlight: Highlight["texts"] = [];
  let departmentHighlight: Highlight["texts"] = [];
  let subjectCodeHighlight: Highlight["texts"] = [];
  // const settingHighlightValues = (highlights: Highlight[]) => {
  //   if (!Array.isArray(highlights)) return;
  //   for (const highlight of highlights) {
  //     console.log("highlight", highlight);
  //     if (highlight.path.includes("course")) {
  //       courseHighlight = highlight.texts;
  //     } else if (highlight.path.includes("subject.name")) {
  //       subjectHighlight = highlight.texts;
  //     } else if (highlight.path.includes("title")) {
  //       titleHighlight = highlight.texts;
  //     } else if (highlight.path.includes("department")) {
  //       departmentHighlight = highlight.texts;
  //     } else if (highlight.path.includes("subject.code")) {
  //       subjectCodeHighlight = highlight.texts;
  //     }
  //   }
  // };
  // const a = settingHighlightValues(highlights);
  const detailsTextProps: Partial<TextProps> = {
    textStyle: { height: 16 },
    type: "medi12",
    // textTransform: "uppercase",
  };
  const noWrapStyle = allowWrap
    ? {}
    : {
        // whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        textWrap: "nowrap",
      };
  // console.log("CARD DETAILS TEXT", title, subject, subjectCode, testType);
  return (
    <>
      <div className="space-y-1 w100">
        {title && <Text {...detailsTextProps}>{subject}</Text>}
        <Text {...detailsTextProps} textTransform="capitalize">
          {type == "notes" ? "📓 Notes" : "📝 Paper"}
        </Text>
        <Text
          textStyle={{ ...noWrapStyle }}
          textClass="w100 leading-7"
          type={textType || "h3"}
        >
          <Link className="mt5" href={pathDocId(_id, href)}>
            <CardDetailsHeading
              title={title}
              subject={subject}
              testType={testType}
              subjectCodeHighlight={subjectCodeHighlight}
              subjectHighlight={subjectHighlight}
            />
          </Link>
        </Text>
        <div className="frc w100 gap-1">
          <Text
            {...detailsTextProps}
            textClass="max-w-[85%] text-ellipsis overflow-hidden whitespace-nowrap "
          >
            {univ?.name || course?.name || "SRM University"}
          </Text>
          <Text {...detailsTextProps}>{year ? " - " + year : ""}</Text>
        </div>
      </div>
    </>
  );
};

export default memo(CardDetailsText);
