import { firstLetterUppercase } from "@cllgnotes/lib";
import { NotesHeroTextProps } from "@cllgnotes/types";
import { memo } from "react";
import { CardTextBox, DetailTabGroup, Text } from "ui";

const NotesPageTextBox = ({
  title,
  labels,
  desc,
  testType,
  subject,
  textBoxProps,
  notPurchased = true,
}: NotesHeroTextProps | any) => {
  return (
    <>
      <div style={{ width: "100%", maxWidth: notPurchased ? 915 : "none" }}>
        <CardTextBox
          {...textBoxProps}
          style={{
            justifySelf: "flex-start",
            marginBottom: 15,
          }}
        />
        <Text type="h2">
          {title
            ? firstLetterUppercase(title)
            : typeof subject !== "string" &&
              subject &&
              ` ${subject.name} ${
                subject?.code &&
                subject?.code?.toLowerCase() !== subject?.name?.toLowerCase()
                  ? `: ${subject.code}`
                  : ""
              } ${testType ? `: ${testType?.toUpperCase()} : ` : ""}`}
        </Text>
        <p className="regu16 mt15 mb20" style={{ opacity: 0.8 }}>
          {firstLetterUppercase(desc)}
        </p>
        <DetailTabGroup data={labels} />
      </div>
    </>
  );
};

export default memo(NotesPageTextBox);
