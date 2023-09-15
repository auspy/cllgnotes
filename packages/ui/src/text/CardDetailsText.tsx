import { CardDetailsBoxProps, TextProps } from "@cllgnotes/types";
import Text from "./Text";
import Link from "next/link";
import { pathDocId } from "@cllgnotes/lib";

const CardDetailsText = ({
  subject,
  topic,
  univ,
  _id,
}: CardDetailsBoxProps) => {
  const detailsTextProps: Partial<TextProps> = {
    textStyle: { height: 16 },
    type: "medi12",
    textTransform: "uppercase",
  };
  return (
    <>
      <div className="space-y-1">
        <Text {...detailsTextProps}>{subject}</Text>
        <Text type="h3">
          <Link href={pathDocId(_id)}>
            {String(topic?.[0].toUpperCase() + topic?.slice(1).toLowerCase())}
          </Link>
        </Text>
        <Text {...detailsTextProps}>{univ}</Text>
      </div>
    </>
  );
};

export default CardDetailsText;
