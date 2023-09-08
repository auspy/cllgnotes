import { Heading, Text } from "ui";
import { HeadingType } from "@cllgnotes/types/types.text";
import { HomeHeroTextProps } from "@cllgnotes/types";
import Image from "next/image";
import Colors from "@cllgnotes/types/colors";

const HeroText = ({
  desc,
  text,
  highlightText,
  element,
  img: { height, width, ...restImg },
  imgStyles,
  descMaxWidth,
  color,
}: HomeHeroTextProps) => {
  return (
    <>
      <div
        id="homeHeroImg"
        className="w100 fcc"
        style={{
          maxHeight: height || 470,
          maxWidth: width || 734,
          height: "inherit",
          position: "absolute",
          right: 0,
          bottom: "32%",
          ...imgStyles,
        }}
      >
        <Image {...restImg} fill priority />
      </div>
      <div className="w100" style={{ alignSelf: "flex-end" }}>
        <Text
          text={desc}
          textStyle={{ maxWidth: descMaxWidth || 669 }}
          type="medi22"
        />
        <Heading
          type={HeadingType.h1}
          headingClass="my-[20px]"
          text={text}
          highlightText={highlightText}
          highlightTextStyle={{
            color: Colors[color || "blue"],
            WebkitTextFillColor: Colors[color || "blue"],
          }}
        />
        <div className="frcsb w100" style={{ columnGap: 25 }}>
          {element}
        </div>
      </div>
    </>
  );
};

export default HeroText;
