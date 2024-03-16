import { ButtonProps } from "./types.buttons";
import { FilterSidebarGrpProps } from "./types.filter";

export type ButtonRowProps = {
  data: ButtonProps[];
  maxWidth?: 434 | 318;
  minWidth?: number;
  height?: 90 | 120;
  rowGap?: number;
  select: [string, Record<string, boolean>];
  onClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    filterItem: FilterChipProps,
    index: number
  ) => void;
  columnGap?: number;
  commonButtonProps?: Omit<
    ButtonProps,
    "width" | "height" | "text" | "onClick"
  >;
};

export type FilterChipProps = {
  label: string;
  key: string;
  value?: string;
};

export type FilterChipMap = { [key: string]: Record<string, boolean | string> };
export type ChipGrpProps = {
  setChipData: React.Dispatch<React.SetStateAction<FilterChipMap>>;
  chipData: FilterChipMap;
  clearFilters: () => void;
};

export type AddFilterProps = {
  addFilter?: (chip: FilterChipProps, change?: boolean) => void;
};

export type ManageFiltersProps = AddFilterProps & {
  removeFilter?: (chip: FilterChipProps) => void;
  maxWidth?: number | string;
  data?: FilterSidebarGrpProps[];
};
