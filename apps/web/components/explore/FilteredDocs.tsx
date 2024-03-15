"use client";
import { GET_FILTERED_DOCS } from "@/api/graphql/gql";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import {
  modifyToCardsData,
  useRecoilFilter,
  FilterOnPageLoad,
  throttle,
} from "@cllgnotes/lib";
import { CardProps, DocsQueryProps } from "@cllgnotes/types";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState, useTransition } from "react";
import { CardGrp, List, ToolBar } from "ui";

const FilteredDocs = ({}) => {
  // * VARIABLES
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const search = searchParams.get("search") || "";
  // console.log("search in filteredDo", search);
  const pageNum = useRef(searchParams.get("page") || 1);
  const [page, setPage] = useState(searchParams.get("page") || 1);
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
  const pageSize = 20;
  const { data, error, fetchMore, refetch, networkStatus } =
    useSuspenseQuery<DocsQueryProps>(GET_FILTERED_DOCS, {
      queryKey: "getFilteredDocs",
      variables: {
        filter: JSON.stringify(filters),
        page: Number(page),
        search,
        pageSize,
      },
      context: {
        debounceKey: "getFilteredDocs",
        debounceTime: 1000,
      },
    });
  const isFetchingMore = networkStatus === 3;
  console.log("network status", networkStatus);

  // console.log("data", Object.keys(data?.getFilteredDocs || {}));
  // MODIFY DATA
  const docs = data?.getFilteredDocs?.data;
  const cardsData = modifyToCardsData(docs, {
    imgHeight: 240,
    textType: "semi16",
  }) as CardProps[];
  const totalDocs = data?.getFilteredDocs?.count || cardsData?.length;
  const canFetchMore = docs && docs.length < totalDocs;
  console.log(
    docs?.length,
    "in view from page",
    page,
    totalDocs,
    "canFetchMore",
    canFetchMore
  );
  const foundCourses =
    data?.getFilteredDocs?.status === "success" && Boolean(cardsData);

  function handleRefetch() {
    if (!canFetchMore) {
      console.log("no more data");
      return;
    }
    if (isFetchingMore || isPending) {
      console.log(
        "fetching more data in progress",
        isFetchingMore,
        "isPending",
        isPending
      );
      return;
    }
    console.log("fetching more data starting");
    startTransition(async () => {
      console.log("fetching page", Number(page), "pageNum", pageNum.current);
      await fetchMore({
        variables: {
          page: pageNum.current,
        },
      });
      pageNum.current = Number(pageNum.current) + 1;
    });
  }
  //   * infinite scroll
  const lastItemRef: any = useRef(null);
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (
      lastItemRef.current &&
      scrollTop + clientHeight >= lastItemRef.current.offsetTop &&
      !isFetchingMore &&
      !isPending &&
      canFetchMore
    ) {
      console.log("Last item in view, fetching more data...");
      handleRefetch();
    }
  };

  useEffect(() => {
    if (!canFetchMore) {
      console.log("no more data");
      return;
    }
    const scrollListener = throttle(() => {
      handleScroll();
    });

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [canFetchMore]);

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
              lastRef={lastItemRef}
              id="nice"
              loadingMore={isPending}
              style={{ width: "100%" }}
              data={cardsData.sort(
                (a, b) => a.title?.localeCompare(String(b?.title)) || 0
              )}
            />
          ) : (
            <List
              loadingMore={isPending}
              lastRef={lastItemRef}
              id=""
              data={cardsData!}
            />
          )}
        </div>
      </Suspense>
    </>
  );
};

export default FilteredDocs;
