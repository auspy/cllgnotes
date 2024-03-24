import { firstLetterUppercase } from "@cllgnotes/lib";
import { NotesHeroTextProps } from "@cllgnotes/types";
import { memo } from "react";
import {
  CardTextBox,
  DetailTabGroup,
  Text,
  CardDetialsHeading,
  SidebarDetailsBox,
} from "ui";

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
      <div
        className={notPurchased ? "" : "p-5"}
        style={{ width: "100%", maxWidth: notPurchased ? 915 : "none" }}
      >
        <CardTextBox
          {...textBoxProps}
          style={{
            justifySelf: "flex-start",
            marginBottom: 15,
          }}
        />
        <Text
          textClass="mb15 leading-[1.2]"
          type={notPurchased ? "h2" : "h3"}
          textStyle={
            {
              // lineHeight: "1.5",
            }
          }
        >
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
        {notPurchased ? (
          <DetailTabGroup data={labels} />
        ) : (
          <SidebarDetailsBox labels={labels} />
        )}
      </div>
    </>
  );
};

export default memo(NotesPageTextBox);
