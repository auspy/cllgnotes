import { ButtonProps } from "./types.buttons";

export type ButtonRowProps = {
  data: ButtonProps[];
  maxWidth?: 434 | 318;
  minWidth?: number;
  height?: 90 | 120;
  rowGap?: number;
  columnGap?: number;
  buttonProps?: Omit<ButtonProps, "width" | "height" | "text">;
};
