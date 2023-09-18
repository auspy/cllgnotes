"use client";
import Colors from "@cllgnotes/types/colors";
import { SearchBarProps } from "@cllgnotes/types/searchBar";
import { Search, ChevronRightRounded } from "../mui/mui";
import { useState } from "react";
import { ButtonFontSizes } from "@cllgnotes/types/types.buttons";
import Button from "../buttons/Button";
import ShadowsType from "@cllgnotes/types/shadows";
import { useDeviceType } from "@cllgnotes/lib";

// search bar style for every search bar and works based on height
// todo add a query parameter that allows us to add query and run by button click. other option is to add send data to usestate of parent component and run query there
const SearchBar = ({
  height,
  options,
  maxWidth,
  exploreBtn = false,
  placeholder,
}: SearchBarProps) => {
  const device = useDeviceType();
  const needSearchButton = height !== 90;
  const isMobile = device === "mobile";
  const isDesktop = device === "desktop";
  // if (height == 90 && isMobile) {
  //   height = 60;
  // }
  // * STYLES
  let fontSize = 22;
  const isHeight50 = height === 50;
  const isHeight60 = height === 60;
  const isHeight90 = height === 90;
  if (!isHeight90) {
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
  const focusdStyle: React.CSSProperties = {
    boxShadow: "unset",
    transform: "scale(0.98) translate(3px, 3px)",
    border: `1.5px solid ${Colors.dark}`,
  };
  //   * STATES
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [option, setOption] = useState<string>(options?.[0] || "");
  const handleSearch = () => {
    console.log("searching");
  };
  return (
    <div className="w100 frc flex-col md:flex-row gap-x-[25px] gap-y-4">
      <div
        className="searchBar priBtn frc w100 overflow-hidden"
        style={{
          height,
          maxWidth,
          // minWidth: 490,
          ...(isFocused
            ? focusdStyle
            : !isHeight90 && { boxShadow: ShadowsType.box5 }),
        }}
      >
        {/* dropdown menu */}
        {!isHeight50 && (
          <select
            onChange={(e) => setOption(e.target.value)}
            className={` w100 semi caps`}
            value={option}
            style={{
              ...commonStyle,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              flex: 1,
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
          className={`w100 medi`}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          value={searchText}
          style={{
            flex: 3,
            ...commonStyle,
            paddingInlineStart: "4%",
            ...(isHeight50 ? height50Style : otherCommonStyle),
            ...(!isHeight90 && { boxShadow: ShadowsType.box5 }),
            ...(isHeight60 && { borderRight: "none", borderRadius: 0 }),
          }}
          type="text"
          placeholder={placeholder || "Search for notes, papers, etc."}
        ></input>
        {needSearchButton && (
          <button
            onClick={handleSearch}
            className=""
            style={{
              ...commonStyle,
              ...otherCommonStyle,
              paddingInline: 12,
              backgroundColor: Colors.lGrey2,
              ...(!isHeight90 && { boxShadow: ShadowsType.box5 }),
            }}
          >
            <Search />
          </button>
        )}
      </div>
      {exploreBtn && (
        <Button
          buttonStyles={{ maxWidth: !isDesktop ? "unset" : 289 }}
          text="Explore Docs"
          height={height == 50 ? 60 : height}
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
