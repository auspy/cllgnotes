import { ImgProps } from "./types.img";
import { CardDetailsBoxProps, CardTextBoxProps } from "./types.text";

export enum CardFontSize {
  small = 12,
  medium = 22,
}
export enum CardFontWeight {
  small = 500,
  large = 600,
}
export type CardProps = Omit<CardTextBoxProps, "isAbsolute"> &
  CardDetailsBoxProps & {
    img: ImgProps;
    imgHeight?: 240 | 268;
    minWidth?: number;
    likes?: number;
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
