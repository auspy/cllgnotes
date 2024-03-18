import { CardProps } from "@cllgnotes/types";
import { CardGrp } from "ui";

// this will be a ssr comp that gets the docs from the db based on filters
const FilterDocs = ({
  minWidth,
  data,
}: {
  minWidth?: number;
  data?: CardProps[];
}) => {
  return (
    <>
      <CardGrp id="cardContainer" data={data as any} />
    </>
  );
};

export default FilterDocs;
