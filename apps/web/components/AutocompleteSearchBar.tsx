"use client";

import { useState, useEffect, useCallback } from "react";
import useSearchbarAutocomplete from "./hooks/useSearchbarAutocomplete";
import SearchBar from "./SearchBar";
import { DocAutoComplete } from "@cllgnotes/types";
import { debounce } from "@cllgnotes/lib";

const AutocompleteSearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const { data, loading, error } = useSearchbarAutocomplete({ searchText });

  const debouncedSetSearchText = useCallback(
    debounce((text: string) => {
      setSearchText(text);
    }, 300),
    []
  );

  if (error) {
    console.error("Autocomplete error:", error);
    return <div>Error loading autocomplete suggestions</div>;
  }

  return (
    <SearchBar
      autocomplete={data || []}
      setSearchText={debouncedSetSearchText}
      height={60}
      isLoading={loading}
    />
  );
};

export default AutocompleteSearchBar;
