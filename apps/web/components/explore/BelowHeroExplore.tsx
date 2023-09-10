"use client";
import Suggestions from "@/components/explore/suggestions/Suggestions";
import { dummyCardsData } from "@cllgnotes/lib/dummyData";
import { FilterChipMap, FilterChipProps } from "@cllgnotes/types";
import { useState } from "react";
import { CardGrp, FilterSidebar, List, ToolBar } from "ui";
const BelowHeroExplore = () => {
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
  return (
    <>
      <div
        className="topContainer flex flex-col mt40"
        style={{ rowGap: 60, marginBottom: 100 }}
      >
        <Suggestions addFilter={addFilter} />
        <div className="frfs w100" style={{ gap: 30 }}>
          <FilterSidebar removeFilter={removeAFilter} addFilter={addFilter} />
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
              found={100}
            />
            {!showGrid ? (
              <CardGrp
                needHeading={false}
                type="grid"
                id="nice"
                data={dummyCardsData({ imgHeight: 240 })}
              />
            ) : (
              <List id="" data={dummyCardsData()} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BelowHeroExplore;
