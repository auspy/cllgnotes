import { ColorsType } from "./colors";
import { ImgProps } from "./types.img";
export enum WhatWeSellTitleEnum {
  Notes = "Notes",
  Presentations = "Presentations",
  "Past Papers" = "Past Papers",
}
type WhatWeSellTitle = "Notes" | "Presentations" | "Past Papers";
export type WhatWeSellItem = {
  title: WhatWeSellTitle;
  desc: string;
  img: ImgProps;
  color: ColorsType;
};
export type WhatWeSellProps = {
  data: WhatWeSellItem[];
};
