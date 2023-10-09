import { pathDocId } from "@cllgnotes/lib";
import { Borders, CardProps } from "@cllgnotes/types";
import Image from "next/image";
import { CardDetailsText, CardTextBox, LinkWrapper } from "ui";

export const DocCard = ({
  img,
  subject,
  title,
  testType,
  subjectCode,
  univ,
  imgHeight = 268,
  minWidth,
  department,
  course,
  year,
  color,
  type,
  textType,
  _id,
  href, // will be used as base. endpoint will remain same
}: CardProps) => {
  return (
    <>
      <LinkWrapper
        href={pathDocId(_id, href)}
        className="flex max-w-[620px] md:max-w-[460px] xl:max-w-[320px]"
      >
        <div
          className="w100 rPosi pl-[5px] pr-[5px] pb-[20px] pt-[5px] rounded-md "
          style={{ minWidth: minWidth || 320, border: Borders.dark }}
        >
          <div className="w100">
            {/* IMAGE */}
            <div
              className="relative rounded-ss-[5px] rounded-se-[5px]"
              style={{
                height: imgHeight || img.height,
                width: "100%" || img.width,
                overflow: "hidden",
              }}
            >
              <Image
                {...img}
                style={{
                  width: "100%",
                  height: img.fill ? "100%" : "inherit",
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
            textType={textType}
            subjectCode={subjectCode}
            subject={subject}
            title={title}
            year={year}
            testType={testType}
            univ={univ}
            href={href}
            type={type}
          />
        </div>
      </LinkWrapper>
    </>
  );
};

export default DocCard;
