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
        <Text textClass="mb15" type="h2">
          {title
            ? firstLetterUppercase(title)
            : ` ${subject.name} ${
                subject?.code &&
                subject?.code
                  .substring(0, subject?.name?.length || 0)
                  ?.toLowerCase() != subject?.name?.toLowerCase()
                  ? `: ${subject.code}`
                  : ""
              } ${testType ? `: ${testType?.toUpperCase()}` : ""}`}
        </Text>
        {desc && (
          <p className="regu16 mb20" style={{ opacity: 0.8 }}>
            {firstLetterUppercase(desc)}
          </p>
        )}
        <DetailTabGroup data={labels} />
      </div>
    </>
  );
};

export default memo(NotesPageTextBox);
