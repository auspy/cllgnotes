"use client";
import Colors from "@cllgnotes/types/colors";
import { SearchBarProps, ShadowsType, ButtonFontSizes } from "@cllgnotes/types";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Search,
  ChevronRightRounded,
  CircularProgress,
} from "ui";
import { debounce, useDeviceType } from "@cllgnotes/lib";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBarDropdownItem from "./SearchBarDropdownItem";

// search bar style for every search bar and works based on height
const SearchBar = ({
  height,
  options,
  maxWidth,
  exploreBtn = false,
  placeholder,
  setSearchText: setText,
  autocomplete,
  isLoading,
}: SearchBarProps & {
  searchText?: string;
  setSearchText?: any;
  autocomplete?: any[] | null;
  isLoading?: boolean;
}) => {
  const device = useDeviceType();
  const needSearchButton = height !== 90;
  const isDesktop = device === "desktop";
  const [showDialog, setShowDialog] = useState(false);
  // if (height == 90 && isMobile) {
  //   height = 60;
  // }
  // * STYLES
  let fontSize = 22;
  const isHeight40 = height === 40;
  const isHeight50 = height === 50;
  const isHeight60 = height === 60;
  const isHeight90 = height === 90;
  if (isHeight40) {
    fontSize = 14;
  } else if (!isHeight90) {
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
    borderLeft:
      Array.isArray(options) && options.length > 0
        ? "1px dashed var(--dark)"
        : "unset",
  };
  const focusdStyle: React.CSSProperties = {
    boxShadow: "unset",
    transform: "scale(0.98) translate(3px, 3px)",
    border: `1.75px solid ${Colors.dark}`,
  };
  //   * STATES
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [option, setOption] = useState<string>(options?.[0] || "");
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const searchFunc = (text: string) => {
    console.log("text in searchFunc", text);
    setSearchText(text);
    if (setText) {
      setText(text);
    } else {
      isHeight40 && link(text);
    }
  };
  const link = (text?: string) => {
    if (isHeight40 && !setText) {
      return;
    }
    const baseUrl = "/explore?";
    console.log("baseUrl", baseUrl);
    if (!text) {
      params.delete("search");
      router.push(baseUrl + params.toString());
      return text;
    }
    params.set("search", text);
    router.push(baseUrl + params.toString());
    return text;
  };
  const debouncedSearch = debounce(searchFunc, 300);
  const handleSearch = () => {
    console.log("searching");
    link(searchText);
  };
  useEffect(() => {
    if (searchText) {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  }, [searchText]);

  // * FETCHING SUGGESTIONS AND AUTOCOMPLETE
  const safeAutocomplete = Array.isArray(autocomplete) ? autocomplete : [];

  return (
    <div className="w100 frc flex-col relative md:flex-row gap-x-[25px] gap-y-4">
      {searchText &&
        isHeight60 &&
        (isLoading ||
          (Array.isArray(autocomplete) && autocomplete.length > 0)) && (
          <Dialog
            style={{
              maxHeight: height * 4,
              top: height,
            }}
            className="!px-4 fcfs"
            show={showDialog}
            setShow={setShowDialog}
          >
            {isLoading ? (
              <div className="fcc w100">
                <CircularProgress size={14} />
              </div>
            ) : (
              safeAutocomplete.map((item, index) => (
                <SearchBarDropdownItem index={index} key={index} {...item} />
              ))
            )}
          </Dialog>
        )}
      <form
        autoComplete="off"
        className="searchBar  priBtn frc w100 overflow-hidden"
        action="/explore"
        style={{
          height,
          maxWidth,
          // minWidth: 490,
          ...(isFocused
            ? focusdStyle
            : !isHeight90 && {
                boxShadow: isHeight40 ? ShadowsType.box1 : ShadowsType.box5,
              }),
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        {/* dropdown menu */}
        {!isHeight50 && Array.isArray(options) && options.length > 0 && (
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
          id="searchbar"
          name="search"
          className={`w100 medi`}
          onChange={(e) => {
            const text = e.target.value;
            debouncedSearch(text);
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          defaultValue={searchText}
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
        <input type="submit" value="Submit" hidden />
        {needSearchButton && (
          <button
            onClick={handleSearch}
            type="button"
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
      </form>
      {exploreBtn && (
        <Button
          buttonClasses="exploreBtn"
          onClick={handleSearch}
          buttonStyles={{ maxWidth: !isDesktop ? "unset" : 289 }}
          text="Explore Docs"
          height={height == 50 ? 60 : height}
          fontSize={ButtonFontSizes.large}
          icon={
            <div className="arrowIcons frc h-[32px] w-[32px] overflow-hidden">
              <ChevronRightRounded
                color="inherit"
                sx={{
                  fontSize: 32,
                }}
                className="mr-[-20px]"
                style={{ strokeWidth: 5 }}
              />
              <ChevronRightRounded
                color="inherit"
                sx={{
                  fontSize: 32,
                }}
                style={{ strokeWidth: 5 }}
                className="transition-all duration-300"
              />
            </div>
          }
        />
      )}
    </div>
  );
};

export default SearchBar;
