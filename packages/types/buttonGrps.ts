import { ButtonProps } from "./types.buttons";

export type ButtonRowProps = {
  data: ButtonProps[];
  maxWidth?: 434 | 318;
  minWidth?: number;
  height?: 90 | 120;
  rowGap?: number;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    filterItem: FilterChipProps
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
};

export type FilterChipMap = { [key: string]: string };
export type ChipGrpProps = {
  setChipData: React.Dispatch<React.SetStateAction<FilterChipMap>>;
  chipData: FilterChipMap;
  clearFilters: () => void;
};

export type AddFilterProps = {
  addFilter: (chip: FilterChipProps) => void;
};

export type ManageFiltersProps = AddFilterProps & {
  removeFilter: (chip: FilterChipProps) => void;
  maxWidth?: number | string;
};
