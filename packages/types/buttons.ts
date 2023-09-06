export enum ButtonHeights {
  small = 70,
  medium = 90,
  large = 120,
}
enum ButtonFontSizes {
  small = 16,
  large = 22,
}
export type ButtonProps = {
  text: string;
  disabled?: boolean;
  height?: ButtonHeights;
  width?: number | "100%" | "inherit";
  fontSize?: ButtonFontSizes;
  buttonStyles?: React.CSSProperties;
  buttonClasses?: string;
  buttonTextStyles?: React.CSSProperties;
  buttonTextClasses?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
  iconLeft?: boolean;
};
// & (
//   | { icon?: undefined }
//   | { icon: React.ReactNode; iconPosition: "left" | "right" }
// );
