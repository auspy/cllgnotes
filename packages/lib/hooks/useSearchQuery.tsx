"use client";
import { useRecoilFilter } from "../state";
import { useEffect, useState } from "react";
import { FilterChipMap } from "@cllgnotes/types";
import { useRouter, useSearchParams } from "next/navigation";
import { pathExplore } from "../paths";
const useSearchQuery = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  // * GET FILTERS TO GENERATE QUERY
  const { filters, setFilter } = useRecoilFilter();
  // * GET FILTERS FROM SEARCH QUERY
  const getFiltersFromQuery = (params = searchParams) => {
    const obj: FilterChipMap = {};
    try {
      const data = params.get("search") || "";
      Object.assign(obj, JSON.parse(data));
    } catch (error) {
      console.log("error in getFiltersFromQuery", error);
    }
    setFilter(obj);
    return obj;
  };
  useEffect(() => {
    const fltrs = getFiltersFromQuery();
    // console.log("query", fltrs);
  }, []);
  // * GENERATE QUERY
  const updateSearchParams = (filters: FilterChipMap) => {
    try {
      const query = JSON.stringify(filters);
      // console.log("new query", query);
      setSearchQuery(query);
      // router.push(pathExplore(query));
      console.log("create new search params");
    } catch (error) {
      console.log("error in updateSearchParams", error);
    }
  };
  // * GENERATE QUERY ON FILTERS CHANGE
  // change url query params
  useEffect(() => {
    // console.log("efftc");
    updateSearchParams(filters);
  }, [filters]);
  // * RETURN CURRENT QUERY
  return pathExplore(searchQuery);
};

export default useSearchQuery;
