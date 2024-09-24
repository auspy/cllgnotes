"use client";
import { AUTOCOMPLETE } from "@/db/graphql/gql";
import { useQuery } from "@apollo/client";
import { DocsQueryProps } from "@cllgnotes/types";
import { useSearchParams } from "next/navigation";

const useSearchbarAutocomplete = ({ searchText }: { searchText: string }) => {
  const pageSize = 10;
  const searchParams = useSearchParams();
  const filtersParams = searchParams.get("filters");

  const { data, loading, error } = useQuery<DocsQueryProps>(AUTOCOMPLETE, {
    variables: {
      filter: filtersParams,
      search: searchText,
      pageSize,
      page: 0,
    },
    skip: !Boolean(searchText),
    fetchPolicy: "network-only", // This ensures we always fetch fresh data
  });

  const autocompleteData = data?.Autocomplete || [];

  return {
    data: Array.isArray(autocompleteData) ? autocompleteData : [],
    loading,
    error,
  };
};

export default useSearchbarAutocomplete;
