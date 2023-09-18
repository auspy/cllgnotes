import { ColorsType } from "./colors";

export type typeNavigationItem = {
  text: string;
  href: string;
};
export type NavigationProps = {
  data?: typeNavigationItem[];
  gap?: number;
  color?: ColorsType;
  textTransform?: "uppercase" | "capitalize";
  flexDir?: "row" | "column";
};
