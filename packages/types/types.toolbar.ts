import { ChipGrpProps } from "./buttonGrps";
import { ButtonGridProps } from "./types.buttons";

export type ToolbarProp$ = ButtonGridProps & {
  found: number;
  chipGrpProps: ChipGrpProps;
};
