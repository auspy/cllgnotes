import { dummyCardsData } from "@cllgnotes/lib/dummyData";
import { CardGrp } from "ui";

// this will be a ssr comp that gets the docs from the db based on filters
const FilterDocs = ({ minWidth }: { minWidth?: number }) => {
  return (
    <>
      <CardGrp
        id="cardContainer"
        data={
          dummyCardsData({ className: "min-w-[305px] sm:min-w-[360px]" }) as any
        }
      />
    </>
  );
};

export default FilterDocs;
