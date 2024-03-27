"use client";
import SearchBar from "./SearchBar";
import { atomPdf } from "@cllgnotes/lib";
import { useRecoilState } from "recoil";

const CommentsSearchBar = () => {
  const [pdfState, setPdfState] = useRecoilState(atomPdf);
  const updateSearchText = (text: string) => {
    return setPdfState((prev) => ({ ...prev, search: text }));
  };
  return (
    <>
      <SearchBar
        height={40}
        setSearchText={updateSearchText as any}
        searchText={pdfState.search}
        placeholder="Search comments"
      />
    </>
  );
};

export default CommentsSearchBar;
