import { getFilterValues } from "@/db/getFilterValues";
import { getTrendingDocs } from "@/db/getTrendingDocs";

const page = async () => {
  const data = await getTrendingDocs();
  // console.log("data", data);
  return <></>;
};

export default page;
