import { Heading, Text } from "ui";
import { HeadingType } from "@cllgnotes/types/types.text";
import { DeviceTypeEnum, HomeHeroTextProps, ImgProps } from "@cllgnotes/types";
import Colors from "@cllgnotes/types/colors";
import HeroImg from "./HeroImg";
import { ShowInDevice } from "@cllgnotes/lib";

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
  const img = (
    devices: DeviceTypeEnum[] = [DeviceTypeEnum.desktop],
    styles?: React.CSSProperties
  ) => (
    <ShowInDevice devices={[...devices]}>
      <HeroImg
        width={width}
        height={height}
        img={restImg as ImgProps}
        imgStyles={{ ...styles, ...imgStyles }}
      />
    </ShowInDevice>
  );
  return (
    <>
      {img()}
      <div className="w100 flex flex-wrap flex-col-reverse self-start pt-[40px] lg:pt-0 lg:flex-row gap-6  lg:self-end">
        <Text
          text={desc}
          textClass={`max-w-[100%] lg:max-w-[50%]`}
          type="medi22"
        />
        <div className="overflow-hidden pb-2">
          <Heading
            headingClass={"heroText" + color}
            type={HeadingType.h1}
            text={text}
            highlightText={highlightText}
            highlightTextStyle={{
              color: Colors[color || "blue"],
              WebkitTextFillColor: Colors[color || "blue"],
            }}
          />
        </div>

        <div
          className="frcsb w100 -order-1 lg:order-last"
          style={{ columnGap: 25 }}
        >
          {element}
        </div>
        {img([DeviceTypeEnum.mobile, DeviceTypeEnum.tablet], {
          position: "relative",
          bottom: 0,
          order: -2,
        })}
      </div>
    </>
  );
};

export default HeroText;
