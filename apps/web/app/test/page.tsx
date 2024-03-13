import { getFilterValues } from "@/api/getFilterValues";

const page = async () => {
  const data = await getFilterValues("Year");
  return <></>;
};

export default page;
