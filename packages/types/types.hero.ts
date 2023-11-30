import { ColorsType } from "./colors";
import { DocType } from "./types.gql";
import { ImgProps } from "./types.img";
import {
  CardDetailsBoxProps,
  CardTextBoxProps,
  DetailTabProps,
} from "./types.text";

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

export type NotesHeroTextProps = Omit<
  CardDetailsBoxProps,
  "allowWrap" | "href" | "univ"
> & {
  price: number;
  desc: string;
  labels: DetailTabProps[];
  img: ImgProps;
  type: DocType;
  textBoxProps: CardTextBoxProps;
  notPurchased?: boolean;
};
