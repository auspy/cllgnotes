import { ColorsType } from "./colors";
import { ImgProps } from "./types.img";

export enum CardFontSize {
  small = 12,
  medium = 22,
}
export enum CardFontWeight {
  small = 500,
  large = 600,
}
export type CardProps = {
  img: ImgProps;
  department: string;
  course: string;
  semester: number;
  subject: string;
  topic: string;
  univ: string;
  imgHeight?: 240 | 268;
  minWidth?: number;
  color?: ColorsType;
};

type CardCommonProps = {};

export type CardGrpProps = {
  id: string;
  data: CardProps[];
  type?: "grid" | "row";
  rowGap?: number;
  colGap?: number;
  needHeading?: boolean;
};
