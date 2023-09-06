import { TextProps } from "./types.text";

export enum ButtonHeights {
  small = 70,
  medium = 90,
  large = 120,
}
export enum ButtonHeightsBlackType {
  small = 49,
  large = 60,
}
export enum ButtonFontSizesBlack {
  small = 14,
  large = 18,
}
export enum ButtonFontSizes {
  small = 16,
  large = 22,
}
export type ButtonProps = {
  text: string;
  textProps?: Omit<TextProps, "text" | "fontSize">;
  disabled?: boolean;
  width?: number | "100%" | "inherit";
  padding?: number | string;
  buttonStyles?: React.CSSProperties;
  buttonClasses?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  iconGap?: number;
  iconLeft?: boolean;
  fontSize?: ButtonFontSizesBlack | ButtonFontSizes;
  height?: ButtonHeightsBlackType | ButtonHeights;
};
// causing error for some reason
// & (
//   | {
//       fontSize?: ButtonFontSizesBlack;
//       height?: ButtonHeightsBlackType;
//     }
//   | {
//       fontSize?: ButtonFontSizes;
//       height?: ButtonHeights;
//     }
// );

// maybe dont need for now
// & (
//   | { icon?: undefined }
//   | { icon: React.ReactNode; iconPosition: "left" | "right" }
// );
