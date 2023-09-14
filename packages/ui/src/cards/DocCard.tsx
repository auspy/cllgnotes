import { CardProps } from "@cllgnotes/types";
import Image from "next/image";
import Link from "next/link";
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
  year,
  color,
  _id,
}: CardProps) => {
  return (
    <>
      <Link
        href={`/notes/${_id}`}
        className="rPosi pl-[5px] pr-[5px] pb-[20px] pt-[5px] border border-black-500 border-solid rounded-md"
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
            year={year}
            color={color}
          />
        </div>
        {/* DETAILS */}
        <CardDetailsText
          _id={_id}
          subject={subject}
          topic={topic}
          univ={univ}
        />
      </Link>
    </>
  );
};

export default DocCard;
