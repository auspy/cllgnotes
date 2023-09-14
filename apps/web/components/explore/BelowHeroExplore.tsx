"use client";
import { GET_DOCS } from "@/api/graphql/gql";
import Suggestions from "@/components/explore/suggestions/Suggestions";
import { useSuspenseQuery } from "@apollo/client";
import { modifyToCardsData } from "@cllgnotes/lib";
import {
  CardProps,
  DocsQueryProps,
  FilterChipMap,
  FilterChipProps,
} from "@cllgnotes/types";
import { log, logger } from "logger";
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
  // GRAPHQL QUERY
  const { data } = useSuspenseQuery<DocsQueryProps>(GET_DOCS);
  const docs = data?.getDocs?.data;
  const cardsData = modifyToCardsData(docs, { imgHeight: 240 }) as CardProps[];
  const l = cardsData.length;
  const foundCourses = data?.getDocs?.status == "success" && Boolean(cardsData);
  console.log("docs", docs);
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
              found={l > 1000 ? Math.ceil(l / 10) * 10 : l}
            />
            {!showGrid ? (
              <CardGrp
                needHeading={false}
                type="grid"
                id="nice"
                data={cardsData}
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
