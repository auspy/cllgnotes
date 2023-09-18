import { dummyCardsData } from "@cllgnotes/lib/dummyData";
import { CardGrp } from "ui";

// this will be a ssr comp that gets the docs from the db based on filters
const FilterDocs = ({ minWidth }: { minWidth?: number }) => {
  return (
    <>
      <CardGrp
        id="cardContainer"
        data={dummyCardsData({ minWidth: (minWidth as number) || 360 })}
      />
    </>
  );
};

export default FilterDocs;
