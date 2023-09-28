"use client";
import { atomUserName, firstLetterUppercase } from "@cllgnotes/lib";
import { NotesHeroTextProps } from "@cllgnotes/types";
import { memo } from "react";
import { useRecoilState } from "recoil";
import { CardTextBox, DetailTabGroup, Text } from "ui";

const NotesPageTextBox = ({
  title,
  labels,
  desc,
  testType,
  subject,
  subjectCode,
  textBoxProps,
}: NotesHeroTextProps) => {
  // console.log("NotesPageTextBox is ssr");
  const [user] = useRecoilState(atomUserName);
  const notLoggedIn = !user.username;
  return (
    <>
      <div style={{ width: "100%", maxWidth: notLoggedIn ? 915 : "none" }}>
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
            : `${testType ? `${testType?.toUpperCase()} - ` : ""} ${subject} ${
                subjectCode ? `- ${subjectCode}` : ""
              }`}
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
