import { pathDocId } from "@cllgnotes/lib";
import { Borders, CardProps } from "@cllgnotes/types";
import Image from "next/image";
import { CardDetailsText, CardTextBox, LinkWrapper } from "ui";

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
  href, // will be used as base. endpoint will remain same
}: CardProps) => {
  return (
    <>
      <LinkWrapper href={pathDocId(_id, href)}>
        <div
          className="w100 rPosi pl-[5px] pr-[5px] pb-[20px] pt-[5px] rounded-md max-w-[620px] sm:max-w-[400px] "
          style={{ minWidth: minWidth || 320, border: Borders.dark }}
        >
          <div className="">
            {/* IMAGE */}
            <div
              className="relative rounded-ss-[5px] rounded-se-[5px]"
              style={{
                height: imgHeight || img.height,
                width: img.width,
                overflow: "hidden",
              }}
            >
              <Image
                {...img}
                style={{
                  objectFit: "cover",
                  border: Borders.dark,
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                }}
              />
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
          <div className="mt-[25px]"></div>
          <CardDetailsText
            _id={_id}
            subject={subject}
            topic={topic}
            univ={univ}
            href={href}
          />
        </div>
      </LinkWrapper>
    </>
  );
};

export default DocCard;
