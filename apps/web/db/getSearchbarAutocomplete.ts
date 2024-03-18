import { getClient } from "@/db/graphql/ApolloClient";
import { GET_FILTERED_DOCS } from "@/db/graphql/gql";
import { DocsQueryProps } from "@cllgnotes/types";
import { useSearchParams } from "next/navigation";
const getSearchbarAutocomplete = async ({
  searchText,
}: {
  searchText: string;
}) => {
  if (!searchText) {
    return null;
  }
  try {
    const pageSize = 10;
    const searchParams = useSearchParams();
    const filtersParams = searchParams.get("filters");
    const { data, error } = await getClient().query<DocsQueryProps>({
      query: GET_FILTERED_DOCS,
      variables: {
        filter: filtersParams,
        search: searchText,
        pageSize,
      },
    });
    if (data.getFilteredDocs?.data) {
      return data.getFilteredDocs?.data;
    }
  } catch (error) {
    console.error("error in getSearchbarAutocomplete", error);
  }
  return null;
};

export default getSearchbarAutocomplete;
