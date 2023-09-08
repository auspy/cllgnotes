import { ColorsType } from "./colors";
import { ImgProps } from "./types.img";
export enum WhatWeSellTitleEnum {
  Notes = "Notes",
  Prentations = "Prentations",
  "Past Papers" = "Past Papers",
}
type WhatWeSellTitle = "Notes" | "Prentations" | "Past Papers";
export type WhatWeSellItem = {
  title: WhatWeSellTitle;
  desc: string;
  img: ImgProps;
  color: ColorsType;
};
export type WhatWeSellProps = {
  data: WhatWeSellItem[];
};
