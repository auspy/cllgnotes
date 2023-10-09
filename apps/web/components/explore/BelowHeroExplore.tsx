"use client";
import { GET_DOCS } from "@/api/graphql/gql";
import Suggestions from "@/components/explore/suggestions/Suggestions";
import { useSuspenseQuery } from "@apollo/client";
import { modifyToCardsData, useDeviceType } from "@cllgnotes/lib";
import {
  CardProps,
  DocsQueryProps,
  FilterChipMap,
  FilterChipProps,
} from "@cllgnotes/types";
import { useState } from "react";
import { BottomDrawer, CardGrp, FilterSidebar, List, ToolBar } from "ui";
const BelowHeroExplore = () => {
  const device = useDeviceType();
  // console.log(device);
  const isDesktop = device == "desktop";
  const [filterChips, setFilterChips] = useState<FilterChipMap>({});
  const [showGrid, setShowGrid] = useState(true);
  const clearFilters = () => {
    setFilterChips({});
  };
  const removeAFilter = (chip: FilterChipProps) => {
    const obj = { ...filterChips };
    delete obj[chip.key];
    setFilterChips(obj);
  };
  const addFilter = (chip: FilterChipMap) => {
    if (chip.key in filterChips) {
      return;
    }
    setFilterChips((prev) => {
      return { ...prev, [chip.key]: chip.label };
    });
  };
  // GRAPHQL QUERY
  const { data } = useSuspenseQuery<DocsQueryProps>(GET_DOCS);
  const docs = data?.getDocs?.data;
  const cardsData = modifyToCardsData(docs, {
    imgHeight: 240,
    textType: "semi16",
  }) as CardProps[];
  const l = cardsData.length;
  // console.log(
  //   "DOCS DATA HERE --->",
  //   data,
  //   cardsData,
  //   error,
  //   networkStatus,
  //   client
  // );
  const foundCourses = data?.getDocs?.status == "success" && Boolean(cardsData);
  const filter = (maxWidth: string | number = 320) => (
    <FilterSidebar
      maxWidth={maxWidth}
      removeFilter={removeAFilter}
      addFilter={addFilter}
    />
  );
  if (!foundCourses) {
    return <div>loading...</div>;
  }
  return (
    <>
      <div
        className="topContainer flex flex-col mt40"
        style={{ rowGap: 60, marginBottom: 100 }}
      >
        <Suggestions addFilter={addFilter} />
        <div className="frfs w100" style={{ gap: 30 }}>
          {!isDesktop ? (
            <BottomDrawer>{filter("unset")}</BottomDrawer>
          ) : (
            filter()
          )}
          <div className="w100 fcc" style={{ gap: 25 }}>
            <ToolBar
              isGrid={showGrid}
              setIsGrid={setShowGrid}
              chipGrpProps={{
                clearFilters: clearFilters,
                setChipData: setFilterChips,
                chipData: filterChips,
              }}
              // clearFilters={clearFilter}
              // chipData={filterChips}
              // setChipData={setFilterChips}
              found={l > 1000 ? Math.ceil(l / 10) * 10 : l}
            />
            {!showGrid ? (
              <CardGrp
                needHeading={false}
                type="grid"
                id="nice"
                style={{ width: "100%" }}
                data={cardsData.sort(
                  (a, b) => a.title?.localeCompare(b.title) || 0
                )}
              />
            ) : (
              <List id="" data={cardsData!} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BelowHeroExplore;
