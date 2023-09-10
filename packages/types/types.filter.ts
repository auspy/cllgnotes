import { AddFilterProps, FilterChipProps } from "./buttonGrps";

export type FilterCheckboxListProps = {
  [key: string]: string[];
};

export type FilterSidebarProps = AddFilterProps & {
  data: FilterCheckboxListProps;
  removeFilter: (chip: FilterChipProps) => void;
};
