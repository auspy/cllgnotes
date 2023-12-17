"use client";
import { FilterChipMap, FilterChipProps } from "@cllgnotes/types";
import { atomFilter } from "../atoms/atom.filters";
import { useRecoilState } from "recoil";

const useRecoilFilter = () => {
  const [filter, setFilter] = useRecoilState<FilterChipMap>(atomFilter);
  const clearFilters = () => {
    setFilter({});
  };
  const removeFilter = (chip: FilterChipProps) => {
    const obj = { ...filter };
    delete obj[chip.key];
    setFilter(obj);
  };
  const addFilter = (chip: FilterChipProps, change: boolean = false) => {
    if (chip.key in filter) {
      removeFilter(chip);
      if (!change) return;
    }
    // setting atom value
    setFilter((prev) => {
      return { ...prev, [chip.key]: chip.label };
    });
  };
  return {
    filter,
    setFilter,
    clearFilters,
    removeFilter,
    addFilter,
  };
};

export default useRecoilFilter;
