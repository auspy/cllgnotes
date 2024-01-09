"use client";
import { GET_FILTERED_DOCS } from "@/api/graphql/gql";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { modifyToCardsData, useRecoilFilter } from "@cllgnotes/lib";
import { CardProps, DocsQueryProps } from "@cllgnotes/types";
import { Suspense, useEffect, useState } from "react";
import { CardGrp, List, ToolBar } from "ui";

const FilteredDocs = ({}) => {
  // * VARIABLES
  const [showGrid, setShowGrid] = useState(true);
  const {
    filters,
    filters: filtr,
    setFilter: setFiltr,
    clearFilters,
  } = useRecoilFilter();
  // * VARIABLES END
  // * QUERIES
  // GET DATA
  const { data, error, refetch } = useSuspenseQuery<DocsQueryProps>(
    GET_FILTERED_DOCS,
    {
      variables: {
        filter: JSON.stringify(filters),
      },
    }
  );
  // MODIFY DATA
  const docs = data?.getFilteredDocs?.data;
  const cardsData = modifyToCardsData(docs, {
    imgHeight: 240,
    textType: "semi16",
  }) as CardProps[];
  const l = cardsData?.length;
  const foundCourses =
    data?.getFilteredDocs?.status === "success" && Boolean(cardsData);
  useEffect(() => {
    console.log("FILTERED DOCS DATA HERE --->", data, error);
  }, [data]);
  // REFETCH DATA ON FILTER UPDATE
  useEffect(() => {
    refetch();
  }, [filters]);
  // * QUERIES END
  //   if (!foundCourses) return <></>;
  return (
    <>
      <Suspense>
        <div className="w100 fcc" style={{ gap: 25 }}>
          <ToolBar
            isGrid={showGrid}
            setIsGrid={setShowGrid}
            chipGrpProps={{
              clearFilters: clearFilters,
              setChipData: setFiltr,
              chipData: filtr,
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
                (a, b) => a.title?.localeCompare(String(b?.title)) || 0
              )}
            />
          ) : (
            <List id="" data={cardsData!} />
          )}
        </div>
      </Suspense>
    </>
  );
};

export default FilteredDocs;
