import { pathDocId } from "@cllgnotes/lib";
import { Borders, CardProps, ImgProps } from "@cllgnotes/types";
import Image from "next/image";
import LinkWrapper from "../wrappers/LinkWrapper";
import CardTextBox from "../text/CardTextBox";
import CardDetailsText from "../text/CardDetailsText";
import { CustomImageLoader } from "../../loader.config";

export const DocCard = ({
  img,
  subject,
  title,
  testType,
  univ,
  imgHeight = 268,
  minWidth,
  semester,
  department,
  course,
  year,
  color,
  type,
  textType,
  _id,
  className,
  lastRef,
  isGrid = false,
  href, // will be used as base. endpoint will remain same
}: CardProps & { isGrid?: boolean }) => {
  const imgProps: ImgProps | {} = {};
  const imgStyle: React.CSSProperties = {
    width: "100%",
    objectFit: "cover",
    border: Borders.dark,
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  };
  if (img && typeof img == "object") {
    Object.assign(imgProps, img);
  } else {
    Object.assign(imgProps, {
      src: CustomImageLoader({ src: img, type }),
      alt: title,
      fill: true,
    });
  }
  if (!("fill" in imgProps && imgProps.fill)) {
    imgStyle.height = "inherit";
  }
  return (
    <>
      <LinkWrapper
        href={pathDocId(_id, href)}
        className={
          `flex ${
            isGrid
              ? "max-w-[620px] md:max-w-[460px] xl:max-w-[400px]"
              : "w-[340px]  md:w-[400px] xl:w-[360px]"
          }  ` + className
        }
      >
        <div
          ref={lastRef}
          className="w-screen rPosi pl-[5px] pr-[5px] pb-[20px] pt-[5px] rounded-md "
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
              <Image {...(imgProps as ImgProps)} style={imgStyle} />
            </div>
            {/* INFO CARD */}
            <CardTextBox
              isAbsolute={true}
              department={department}
              course={{ name: testType } as any}
              year={year}
              color={color}
              semester={semester}
            />
          </div>
          {/* DETAILS */}
          <div className="mt-[25px]"></div>
          <CardDetailsText
            course={course}
            _id={_id}
            subject={subject}
            title={title}
            univ={univ}
            year={year}
            // testType={testType!}
            href={href}
            type={type}
          />
        </div>
      </LinkWrapper>
    </>
  );
};

export default DocCard;
