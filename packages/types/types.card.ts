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
    href?: string;
  };

export type CardStyleProps = {
  cardClass?: string;
  cardStyle?: React.CSSProperties;
  cardImageClass?: string;
  cardImageStyle?: React.CSSProperties;
  cardTitleClass?: string;
  cardTitleStyle?: React.CSSProperties;
};

export type CardGrpProps = {
  id: string;
  data: CardProps[];
  type?: "grid" | "row";
  rowGap?: number;
  colGap?: number;
  needHeading?: boolean;
  heading?: string;
};

export type BuyNowCardProps = CardStyleProps &
  ImgProps & {
    _id: string;
    price: number;
    cardProps: CardProps;
    discount?: number;
    saleAlarm?: React.ReactNode;
  };
