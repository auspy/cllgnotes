import { getClient } from "./graphql/ApolloClient";
import { GET_FILTERED_DOCS } from "./graphql/gql";

export const getTrendingDocs = async () => {
  try {
    const { data, error } = await getClient().query({
      query: GET_FILTERED_DOCS,
      variables: {
        search: "trending",
      },
    });
    if (error || data?.getFilteredDocs?.status != "success") {
      throw new Error(error?.message || "Error in getTrendingDocs");
    }
    return data;
  } catch (error) {
    console.log("error in getTrendingDocs", error);
    return null;
  }
};
