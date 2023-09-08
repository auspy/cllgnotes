import { ColorsType } from "./colors";
import { ImgProps } from "./types.img";

export type HomeHeroTextProps = {
  text: React.ReactNode;
  highlightText: string;
  desc: string;
  element: React.ReactNode;
  img: ImgProps;
  imgStyles?: React.CSSProperties;
  descMaxWidth?: number;
  color?: ColorsType;
};
