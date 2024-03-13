import { AddFilterProps, FilterChipProps } from "./buttonGrps";
import { ButtonProps } from "./types.buttons";
import { SliderProps } from "./types.slider";

export type FilterCheckboxListProps = {
  [key: string]: ButtonProps[];
};

export type FilterSidebarProps = AddFilterProps & {
  data: FilterSidebarGrpProps[];
  removeFilter?: (chip: FilterChipProps) => void;
};
export type FilterSidebarGrpProps = { key: string } & (
  | ({
      title?: string;
      data?: ButtonProps[];
      type: "slider";
    } & SliderProps)
  | ({
      title: string;
      data: ButtonProps[];
      type?: "checkbox";
    } & Partial<SliderProps>)
);

export type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Year = 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 | 2027 | 2028;
export type University = "SRM University";

export const FilterOptions = [
  "Semester",
  "Year",
  // "University",
  "Department",
  "Course",
  "Subject",
] as const;

export type FilterKeys = (typeof FilterOptions)[number];
