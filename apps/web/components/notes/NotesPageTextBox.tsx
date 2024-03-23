import { firstLetterUppercase } from "@cllgnotes/lib";
import { NotesHeroTextProps } from "@cllgnotes/types";
import { memo } from "react";
import { CardTextBox, DetailTabGroup, Text, CardDetialsHeading } from "ui";

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
          <CardDetialsHeading
            title={title}
            subject={subject}
            testType={testType}
          />
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
