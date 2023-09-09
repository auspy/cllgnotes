import { CardProps } from "@cllgnotes/types";
import Image from "next/image";
import { CardDetailsText, CardTextBox } from "ui";

export const DocCard = ({
  img,
  subject,
  topic,
  univ,
  imgHeight = 268,
  minWidth,
  department,
  course,
  semester,
  color,
}: CardProps) => {
  return (
    <>
      <div
        className="rPosi pl-[7px] pr-[7px] pb-[20px] pt-[7px] border border-black-500 border-solid rounded-md"
        style={{ maxWidth: 400, minWidth: minWidth || 320 }}
      >
        <div className="mb15">
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
          <CardTextBox
            isAbsolute={true}
            department={department}
            course={course}
            semester={semester}
            color={color}
          />
        </div>
        {/* DETAILS */}
        <CardDetailsText subject={subject} topic={topic} univ={univ} />
      </div>
    </>
  );
};

export default DocCard;
