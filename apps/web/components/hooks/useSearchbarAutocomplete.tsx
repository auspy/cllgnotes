"use client";
import { AUTOCOMPLETE } from "@/db/graphql/gql";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { DocsQueryProps } from "@cllgnotes/types";
import { useSearchParams } from "next/navigation";

const useSearchbarAutocomplete = ({ searchText }: { searchText: string }) => {
  const pageSize = 10;
  const searchParams = useSearchParams();
  const filtersParams = searchParams.get("filters");

  const { data, error, fetchMore, refetch, networkStatus } =
    useSuspenseQuery<DocsQueryProps>(AUTOCOMPLETE, {
      queryKey: "autocomplete",
      variables: {
        filter: filtersParams,
        search: searchText,
        pageSize,
        page: 0,
      },
      context: {
        debounceKey: "autocomplete",
        debounceTime: 300,
      },
      skip: !Boolean(searchText),
    });
  // ? was causing error
  // useEffect(() => {
  //   if (searchText) {
  //     refetch();
  //   }
  // }, [searchText]);

  if (data?.Autocomplete) {
    return data?.Autocomplete;
  } else {
    return null;
  }
};

export default useSearchbarAutocomplete;
