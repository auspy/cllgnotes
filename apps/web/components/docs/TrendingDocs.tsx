import { getTrendingDocs } from "@/db/getTrendingDocs";
import FilterDocs from "../home/FilterDocs";

const TrendingDocs = async () => {
  const data = await getTrendingDocs();
  if (
    !data ||
    !data.getFilteredDocs ||
    Array.isArray(data.getFilteredDocs.docs)
  ) {
    return null;
  }
  const docs = data.getFilteredDocs.data;
  //   const count = data.getFilteredDocs.count || data.getFilteredDocs.docs.length;
  return (
    <>
      <FilterDocs minWidth={305} data={docs} />
    </>
  );
};

export default TrendingDocs;
