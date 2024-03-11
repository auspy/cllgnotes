"use client";
import { GET_FILTERED_DOCS } from "@/api/graphql/gql";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import {
  modifyToCardsData,
  useRecoilFilter,
  FilterOnPageLoad,
} from "@cllgnotes/lib";
import { CardProps, DocsQueryProps } from "@cllgnotes/types";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { CardGrp, List, ToolBar } from "ui";

const FilteredDocs = ({}) => {
  // * VARIABLES
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  console.log("search in filteredDo", search);
  const page = searchParams.get("page") || 1;
  // const filter = searchParams.get("filter") || "";
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
  const { data, error } = useSuspenseQuery<DocsQueryProps>(GET_FILTERED_DOCS, {
    variables: {
      filter: JSON.stringify(filters),
      page: Number(page),
      search,
    },
  });
  console.log("data", Object.keys(data?.getFilteredDocs || {}));
  // MODIFY DATA
  const docs = data?.getFilteredDocs?.data;
  const cardsData = modifyToCardsData(docs, {
    imgHeight: 240,
    textType: "semi16",
  }) as CardProps[];
  const totalDocs = data?.getFilteredDocs?.count || cardsData?.length;
  const foundCourses =
    data?.getFilteredDocs?.status === "success" && Boolean(cardsData);
  // // REFETCH DATA ON FILTER UPDATE
  // useEffect(() => {
  //   refetch();
  // }, [filters]);
  // * QUERIES END
  if (!foundCourses || error) return <></>;
  return (
    <>
      <Suspense>
        <FilterOnPageLoad />
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
            found={
              totalDocs > 1000 ? Math.ceil(totalDocs / 10) * 10 : totalDocs
            }
          />
          {!showGrid && Array.isArray(cardsData) && cardsData.length > 0 ? (
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
