"use client";

import { useState } from "react";
import useSearchbarAutocomplete from "./hooks/useSearchbarAutocomplete";
import SearchBar from "./SearchBar";

const AutocompleteSearchBar = () => {
  const [searchText, setSearchText] = useState("");
  console.log("searchText", searchText);
  const data = useSearchbarAutocomplete({ searchText });
  console.log("data", data);
  return (
    <>
      <SearchBar
        autocomplete={data}
        setSearchText={setSearchText}
        height={60}
      />
    </>
  );
};

export default AutocompleteSearchBar;
