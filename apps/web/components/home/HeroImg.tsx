import { ImgProps } from "@cllgnotes/types";
import Image from "next/image";

const HeroImg = ({
  imgStyles,
  height,
  width,
  img,
}: {
  imgStyles?: React.CSSProperties;
  height: number;
  width: number;
  img: ImgProps;
}) => {
  return (
    <div
      className="rPosi w100 lg:w-2/4 xl:w-full self-center flex justify-center lg:justify-end lg:items-end"
      style={{
        position: "absolute",
        right: 0,
        bottom: "32%",
        ...imgStyles,
      }}
    >
      <Image {...img} width={width} height={height} priority />
    </div>
  );
};

export default HeroImg;
//  w-[540px]  h-[373px] fcc md:w-[734px] md:h-[470px] lg:max-w-[540px] lg:max-h-[373px] xl:max-w-[734px] xl:max-h-[470px]
