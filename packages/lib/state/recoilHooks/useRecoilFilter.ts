"use client";
import { useCallback, useEffect } from "react";
import { FilterChipMap, FilterChipProps } from "@cllgnotes/types";
import { atomFilter } from "../atoms/atom.filters";
import { useRecoilState } from "recoil";
import { useSearchParams } from "next/navigation";

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
    const key = chip.key.toLowerCase();
    const label = chip.label.toLowerCase();
    if (!key || !label) {
      return console.log("missing key or label in remove filter");
    }
    const neededSet = { ...obj[key] };
    // Eg: { docType: {Notes: true, Books: true}}
    if (!neededSet) return;
    // if set has only one element then delete the key
    if (Object.keys(neededSet).length === 1) {
      delete obj[key];
      setFilter(obj);
      return;
    }
    console.log("removing filter", chip, "from", obj[key]);
    delete neededSet[label];
    obj[key] = neededSet;
    if (obj[key] && Object.keys(obj[key]).length === 0) {
      delete obj[key];
    }
    setFilter(obj);
  };
  // * ADD SINGLE FILTER
  const addFilter = (chip: FilterChipProps, change: boolean = false) => {
    try {
      const key = chip.key.toLowerCase();
      const label = chip.label.toLowerCase();
      // check if filter value is already present
      if (key in filters && label in filters[key]) {
        removeFilter(chip);
        if (!change) return;
      }
      // setting atom value
      setFilter((prev) => {
        const obj = { ...prev };
        if (key in obj) {
          // if already present then add to set
          obj[key] = {
            ...obj[key],
            [label]: true,
          };
        } else {
          // if not present then create new set
          obj[key] = { [label]: true };
        }
        // console.log("new filter", obj);
        return obj;
      });
    } catch (error) {
      console.log("error in add filter", error);
    }
  };
  // * QUERY MAP
  const queryMap = useCallback(
    (newFilter?: FilterChipProps) => {
      if (!newFilter) {
        console.log("missing filter in queryMap");
        return {};
      }
      const type = newFilter.key;
      const query: FilterChipMap = { ...filters };
      const newFltr = newFilter.label?.toLowerCase();
      if (!newFltr) {
        console.log("missing label in queryMap");
        return {};
      }
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
      // console.log("new link query", query);
      if (query && Object.keys(query).length === 0) {
        return {};
      }
      return { filters: JSON.stringify(query) };
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
export const FilterOnPageLoad = () => {
  const { setFilter } = useRecoilFilter();
  // * UPDATE FILTERS ON QUERY CHANGE
  const searchParams = useSearchParams();
  const getFiltersFromQuery = (params = searchParams) => {
    const obj: FilterChipMap = {};
    try {
      const data = params.get("filters") || "";
      data && Object.assign(obj, JSON.parse(data));
    } catch (error) {
      console.log("error in getFiltersFromQuery", error);
    }
    console.log("filters from query", obj);
    setFilter(obj);
    return obj;
  };
  useEffect(() => {
    getFiltersFromQuery();
    // console.log("query", fltrs);
  }, [searchParams]);
  return null;
};
