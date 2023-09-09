"use client";
import Colors from "@cllgnotes/types/colors";
import { SearchBarProps } from "@cllgnotes/types/searchBar";
import { Search, ChevronRightRounded } from "../mui/mui";
import { useState } from "react";
import { ButtonFontSizes } from "@cllgnotes/types/types.buttons";
import Button from "../buttons/Button";

// search bar style for every search bar and works based on height
// todo add a query parameter that allows us to add query and run by button click. other option is to add send data to usestate of parent component and run query there
const SearchBar = ({
  height,
  options,
  maxWidth,
  exploreBtn = false,
}: SearchBarProps) => {
  // * STYLES
  let fontSize = 22;
  const isHeight50 = height === 50;
  const isHeight60 = height === 60;
  if (isHeight60 || isHeight50) {
    fontSize = 16;
  }
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
            maxWidth: isHeight60 ? 193 : 270,
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
          ...(isHeight60 && { borderRight: "none", borderRadius: 0 }),
        }}
        type="text"
        placeholder="Search for notes, papers, etc."
      ></input>
      {isHeight50 ||
        (isHeight60 && (
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
            <Search />
          </button>
        ))}
      {exploreBtn && (
        <Button
          buttonStyles={{ maxWidth: 289, marginLeft: 25 }}
          text="Explore Docs"
          fontSize={ButtonFontSizes.large}
          icon={
            <ChevronRightRounded
              color="inherit"
              sx={{
                fontSize: 32,
              }}
              style={{ strokeWidth: 5 }}
            />
          }
        />
      )}
    </div>
  );
};

export default SearchBar;
