import { AddFilterProps, FilterChipProps } from "./buttonGrps";

export type FilterCheckboxListProps = {
  [key: string]: string[];
};

export type FilterSidebarProps = AddFilterProps & {
  data: FilterCheckboxListProps;
  removeFilter: (chip: FilterChipProps) => void;
};

export type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Year = 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 | 2027 | 2028;
export type University = "SRM University";
