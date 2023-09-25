import { CardDetailsBoxProps, TextProps } from "@cllgnotes/types";
import Text from "./Text";
import Link from "next/link";
import { pathDocId } from "@cllgnotes/lib";
import { memo } from "react";

const CardDetailsText = ({
  subject,
  topic,
  univ,
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
    : { whiteSpace: "nowrap", textOverflow: "ellipsis" };
  return (
    <>
      <div className="space-y-1">
        <Text {...detailsTextProps}>{subject}</Text>
        <Text textStyle={{ ...noWrapStyle }} type="h3">
          <Link href={pathDocId(_id, href)}>
            {String(topic?.[0].toUpperCase() + topic?.slice(1).toLowerCase())}
          </Link>
        </Text>
        <Text {...detailsTextProps}>{univ || "SRM University"}</Text>
      </div>
    </>
  );
};

export default memo(CardDetailsText);
