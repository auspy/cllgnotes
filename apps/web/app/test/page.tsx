import { getFilterValues } from "@/api/getFilterValues";
import { getTrendingDocs } from "@/api/getTrendingDocs";

const page = async () => {
  const data = await getTrendingDocs();
  // console.log("data", data);
  return <></>;
};

export default page;
