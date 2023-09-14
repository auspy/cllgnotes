import { ColorsType } from "./colors";
import ShadowsType from "./shadows";
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
export enum IconButtonSizesEnum {
  small = 40,
  large = 60,
}
export type ButtonCommonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonStyles?: React.CSSProperties;
  buttonClasses?: string;
};
export type ButtonProps = ButtonCommonProps & {
  text: string;
  textProps?: Omit<TextProps, "text" | "fontSize">;
  disabled?: boolean;
  width?: number | "100%" | "inherit";
  padding?: number | string;
  icon?: React.ReactNode;
  iconGap?: number;
  iconLeft?: boolean;
  fontSize?: ButtonFontSizesBlack | ButtonFontSizes;
  height?: ButtonHeightsBlackType | ButtonHeights | IconButtonSizesEnum;
  boxShadow?: ShadowsType;
};

export type ButtonBlackProps = Omit<ButtonProps, "fontSize" | "height"> & {
  fontSize?: 14 | 18;
  height?: 49 | 60;
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

export type IconButtonProps = ButtonCommonProps & {
  size?: 40 | 60;
  icon: React.ReactNode;
  onBlack?: boolean;
  color?: ColorsType;
};

export type ButtonGridProps = {
  isGrid: boolean;
  setIsGrid: React.Dispatch<React.SetStateAction<boolean>>;
};

export type LinkButtonProps = ButtonProps & {
  href: string;
};
