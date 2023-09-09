import { Borders, CardProps, TextProps } from "@cllgnotes/types";
import Text from "../text/Text";
import Image from "next/image";
import Colors from "@cllgnotes/types/colors";

export const DocCard = ({
  img,
  department,
  course,
  semester,
  subject,
  topic,
  univ,
  imgHeight = 268,
  minWidth,
  color,
}: CardProps) => {
  // COMMON STYLE PROPS
  const barTextProps: Partial<TextProps> = {
    type: "semi12",
  };
  const detailsTextProps: Partial<TextProps> = {
    textStyle: { height: 16 },
    type: "medi12",
    textTransform: "uppercase",
  };

  return (
    <>
      <div
        className="rPosi pl-[7px] pr-[7px] pb-[20px] pt-[7px] border border-black-500 border-solid rounded-md"
        style={{ maxWidth: 400, minWidth: minWidth || 320 }}
      >
        <div>
          {/* IMAGE */}
          <div
            className="relative rounded-ss-[5px] rounded-se-[5px]"
            style={{
              height: imgHeight,
              overflow: "hidden",
            }}
          >
            <Image {...img} />
          </div>
          {/* INFO CARD */}
          <div style={{ display: "grid" }}>
            <div
              className="absolute frc"
              style={{
                transform: "translateY(-50%)",
                padding: "7px 15px",
                border: Borders.dark,
                columnGap: 8,
                borderRadius: 5,
                backgroundColor: Colors[color || "white"],
                justifySelf: "center",
              }}
            >
              <Text {...barTextProps}>{department}</Text>
              <Text {...barTextProps}>{"•"}</Text>
              <Text {...barTextProps}>{course}</Text>
              <Text {...barTextProps}>{"•"}</Text>
              <Text {...barTextProps}>{String(semester)}</Text>
            </div>
          </div>
        </div>
        {/* DETAILS */}
        <div className="space-y-1 mt15">
          <Text {...detailsTextProps}>{subject}</Text>
          <Text type="h3">
            {topic[0].toUpperCase() + topic.slice(1).toLowerCase()}
          </Text>
          <Text {...detailsTextProps}>{univ}</Text>
        </div>
      </div>
    </>
  );
};

export default DocCard;
