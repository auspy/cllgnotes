"use client";
import Colors from "@cllgnotes/types/colors";
import { SearchBarProps } from "@cllgnotes/types/searchBar";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

// search bar style for every search bar and works based on height
const SearchBar = ({ height, options, maxWidth }: SearchBarProps) => {
  // * STYLES
  let fontSize = 22;
  if (height === 60 || height === 50) {
    fontSize = 16;
  }
  const isHeight50 = height === 50;
  const commonStyle: React.CSSProperties = {
    fontSize,
    height: "100%",
  };
  const height50Style: React.CSSProperties = {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: "none",
  };
  const otherCommonStyle: React.CSSProperties = {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeft: "1px dashed var(--dark)",
  };
  //   * STATES
  const [searchText, setSearchText] = useState<string>("");
  const [option, setOption] = useState<string>(options?.[0] || "");
  const handleSearch = () => {
    console.log("searching");
  };
  return (
    <div
      className="w100 frc"
      style={{
        height,
        maxWidth,
      }}
    >
      {/* dropdown menu */}
      {!isHeight50 && (
        <select
          onChange={(e) => setOption(e.target.value)}
          className={`priBtn w100 semi caps`}
          value={option}
          style={{
            ...commonStyle,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            maxWidth: 270,
            borderRight: "none",
            backgroundColor: Colors.lGrey2,
          }}
        >
          {options &&
            options.map((item, index) => (
              <option key={index} value={item} className={`text-center`}>
                {item}
              </option>
            ))}
        </select>
      )}
      <input
        className={`priBtn w100 medi`}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        value={searchText}
        style={{
          ...commonStyle,
          paddingInlineStart: 30,
          ...(isHeight50 ? height50Style : otherCommonStyle),
        }}
        type="text"
        placeholder="Search for notes, papers, etc."
      ></input>
      {isHeight50 && (
        <button
          onClick={handleSearch}
          className="priBtn"
          style={{
            ...commonStyle,
            ...otherCommonStyle,
            paddingInline: 12,
            backgroundColor: Colors.lGrey2,
          }}
        >
          <SearchIcon />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
