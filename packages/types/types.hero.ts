import { ColorsType } from "./colors";
import { ImgProps } from "./types.img";
import { DetailTabProps } from "./types.text";

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

export type NotesHeroTextProps = {
  title: string;
  desc: string;
  labels: DetailTabProps[];
  img: ImgProps;
};
