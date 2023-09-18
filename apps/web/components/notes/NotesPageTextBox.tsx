import { NotesHeroTextProps } from "@cllgnotes/types";
import { memo } from "react";
import { DetailTabGroup, Text } from "ui";

const NotesPageTextBox = ({ title, labels, desc }: NotesHeroTextProps) => {
  console.log("NotesPageTextBox is ssr");
  const notLoggedIn = true;
  const firstLetterUppercase = (str: string) =>
    str.charAt(0)?.toUpperCase() + str.slice(1);
  return (
    <>
      <div style={{ width: "100%", maxWidth: notLoggedIn ? 915 : "none" }}>
        <Text type="h2">{firstLetterUppercase(title)}</Text>
        <p className="regu16 mt15 mb20" style={{ opacity: 0.8 }}>
          {firstLetterUppercase(desc)}
        </p>
        <DetailTabGroup data={labels} />
      </div>
    </>
  );
};

export default memo(NotesPageTextBox);
