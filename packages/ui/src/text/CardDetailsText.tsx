import { CardDetailsBoxProps, TextProps } from "@cllgnotes/types";
import Text from "./Text";

const CardDetailsText = ({ subject, topic, univ }: CardDetailsBoxProps) => {
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
          {topic?.[0].toUpperCase() + topic?.slice(1).toLowerCase()}
        </Text>
        <Text {...detailsTextProps}>{univ}</Text>
      </div>
    </>
  );
};

export default CardDetailsText;
