"use client";
import { useCallback } from "react";
import { FilterChipMap, FilterChipProps } from "@cllgnotes/types";
import { atomFilter } from "../atoms/atom.filters";
import { useRecoilState } from "recoil";

const useRecoilFilter = () => {
  // * FILTERS
  const [filters, setFilter] = useRecoilState<FilterChipMap>(atomFilter);

  // * CLEAR ALL FILTERS
  const clearFilters = () => {
    setFilter({});
  };
  // * REMOVE SINGLE FILTER
  const removeFilter = (chip: FilterChipProps) => {
    const obj = { ...filters };
    const neededSet = { ...obj[chip.key] };
    // Eg: { docType: {Notes: true, Books: true}}
    if (!neededSet) return;
    // if set has only one element then delete the key
    if (Object.keys(neededSet).length === 1) {
      delete obj[chip.key];
      setFilter(obj);
      return;
    }
    console.log("removing filter", chip, "from", obj[chip.key]);
    delete neededSet[chip.label];
    obj[chip.key] = neededSet;
    if (obj[chip.key] && Object.keys(obj[chip.key]).length === 0) {
      delete obj[chip.key];
    }
    setFilter(obj);
  };
  // * ADD SINGLE FILTER
  const addFilter = (chip: FilterChipProps, change: boolean = false) => {
    // check if filter value is already present
    if (chip.key in filters && chip.label in filters[chip.key]) {
      removeFilter(chip);
      if (!change) return;
    }
    // setting atom value
    setFilter((prev) => {
      const obj = { ...prev };
      if (chip.key in obj) {
        // if already present then add to set
        obj[chip.key] = {
          ...obj[chip.key],
          [chip.label]: true,
        };
      } else {
        // if not present then create new set
        obj[chip.key] = { [chip.label]: true };
      }
      // console.log("new filter", obj);
      return obj;
    });
  };
  // * QUERY MAP
  const queryMap = useCallback(
    (newFilter?: FilterChipProps) => {
      if (!newFilter) return {};
      const type = newFilter.key;
      const query: FilterChipMap = { ...filters };
      const newFltr = newFilter.label;
      const filterMap = { ...filters[type] }; // copy of single filter types {docType: {Notes: true, Books: true}}
      if (filterMap && Object.keys(filterMap).length > 0) {
        // const arr = new Set(set);
        if (newFltr in filterMap) {
          delete filterMap[newFltr];
        } else {
          filterMap[newFltr] = true;
        }
        Object.assign(query, { [type]: filterMap });
      } else {
        Object.assign(query, { [type]: { [newFltr]: true } });
      }
      // to remove empty key
      if (
        !query[type] ||
        (query[type] && Object.keys(query[type]).length === 0)
      )
        delete query[type];
      console.log("new link query", query);
      if (query && Object.keys(query).length === 0) {
        return {};
      }
      return { search: JSON.stringify(query) };
    },
    [filters]
  );
  // * FILTERS END
  return {
    filters,
    setFilter,
    clearFilters,
    removeFilter,
    addFilter,
    queryMap,
  };
};

export default useRecoilFilter;
