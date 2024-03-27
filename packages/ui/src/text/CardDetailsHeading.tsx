import { firstLetterUppercase } from "@cllgnotes/lib";
import { Highlight, Subject, TestType } from "@cllgnotes/types";
import HighlightText from "../HighlightText";

const CardDetailsHeading = ({
  title,
  subject,
  testType,
  subjectHighlight,
  subjectCodeHighlight,
}: {
  title: string;
  subject: Subject;
  testType: TestType;
  subjectHighlight?: Highlight["texts"];
  subjectCodeHighlight?: Highlight["texts"];
}) => {
  let subjectName = subjectHighlight;
  let subjectCode = subjectCodeHighlight;
  if (!Array.isArray(subjectName) || subjectName.length == 0) {
    subjectName = [{ value: subject?.name, type: "value" }];
  }
  if (!Array.isArray(subjectCode) || subjectCode.length == 0) {
    subjectCode = [{ value: subject?.code, type: "value" }];
  }
  return title ? (
    <>{firstLetterUppercase(title)}</>
  ) : (
    <>
      <HighlightText texts={subjectName} />
      {subject?.code &&
      subject?.code.substring(0, subject?.name?.length || 0)?.toLowerCase() !=
        subject?.name?.toLowerCase()
        ? `: ${subject.code}`
        : ""}{" "}
      {testType ? `: ${testType?.toUpperCase()}` : ""}
    </>
  );
};

export default CardDetailsHeading;
