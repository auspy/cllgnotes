import Colors, { ColorsType } from "./colors";
import {
  CourseType,
  DepartmentType,
  DocType,
  Highlight,
  SubjectType,
  TestType,
  UnivType,
} from "./types.gql";

export enum HeadingType {
  h1,
  h2,
  h3,
  h4,
  h5,
}

export type HeadingProps = {
  id?: string;
  text: string | React.ReactNode;
  headingClass?: string;
  headingStyle?: React.CSSProperties;
  highlightText?: string;
  highlightTextStyle?: React.CSSProperties;
  highlightTextClass?: string;
  afterHighlightText?: string;
  type?: HeadingType;
  capitalise?: boolean;
  uppercase?: boolean;
};

export enum FontSizeEnum {
  "_12" = 12,
  "_14" = 14,
  "_16" = 16,
  "_18" = 18,
  "_22" = 22,
  "_36" = 36,
  "_56" = 56,
  "_64" = 64,
}
export enum FontWeightEnum {
  light = 300,
  regu = 400,
  medi = 500,
  semi = 600,
  bold = 700,
  extraBold = 800,
  black = 900,
}
export enum FontFamilyType {
  generalSans = "var(--general-sans)",
  expose = "var(--expose)",
}
// font expose
export const typeTextClass2 = {
  h1e: "text-[64px] expose upper",
  h2e: "text-4xl expose upper",
  h3e: "text-[22px] expose upper",
};

export const textClasses = {
  h1: "semi text-[64px]",
  h2: "semi text-4xl",
  h3: "semi text-[22px]",
  semi12: "semi12",
  semi14: "semi14",
  semi16: "semi16",
  semi18: "semi text-[18px]",
  medi10: "medi text-[10px]",
  medi12: "medi12",
  medi14: "medi14",
  medi16: "medi16",
  medi22: "medi text-[22px]",
  regu14: "regu14",
  ...typeTextClass2,
};
type FontWeightType = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type FontSizeType = 12 | 14 | 16 | 18 | 22 | 36 | 56 | 64;
export type TypeTextClass = keyof typeof textClasses;
type TypeTextTransform = "uppercase" | "capitalize" | "none" | undefined;
export type TextProps = {
  type?: TypeTextClass;
  fontSize?: FontSizeType;
  fontWeight?: FontWeightType;
  textClass?: string;
  textStyle?: React.CSSProperties;
  fontFamily?: FontFamilyType;
  textAlign?: "left" | "center" | "right";
  textTransform?: TypeTextTransform;
  color?: ColorsType;
} & (
  | {
      children: React.ReactNode;
      text?: undefined;
    }
  | {
      children?: React.ReactNode;
      text: string;
    }
);

export type CardTextBoxProps = {
  department: DepartmentType;
  padding?: string;
  course: CourseType;
  semester?: number;
  year: number;
  color?: ColorsType;
  isAbsolute?: boolean;
  style?: React.CSSProperties;
};

export type CardDetailsBoxProps = {
  _id: string;
  subject: string;
  univ: UnivType;
  href?: string;
  allowWrap?: boolean;
  type?: DocType;
  highlights: Highlight[];
  textType?: "semi16" | "h3";
} & (
  | {
      testType?: undefined;
      year?: number;
      title: string;
      subject?: SubjectType;
    }
  | {
      testType: TestType;
      year: number;
      subject: SubjectType;
      title?: string;
    }
);
export type DetailTabProps = {
  title: string;
  value: string;
};

export type DetailTabGroupProps = {
  data: DetailTabProps[];
};
