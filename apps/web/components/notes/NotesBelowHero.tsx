import { dummyCardsData } from "@cllgnotes/lib/dummyData";
import { CardGrp } from "ui";
import FilterDocs from "../home/FilterDocs";

const NotesBelowHero = () => {
  //   const { data } = useSuspenseQuery<DocsQueryProps>(GET_DOCS);
  //   const foundCourses = data?.getDocs?.status == "success";
  //   log(data);
  return (
    <div className="flex flex-col" style={{ gap: 30 }}>
      <CardGrp
        heading="Related"
        id="idcards"
        data={dummyCardsData({ className: "min-w-[305px] sm:min-w-[360px]" })}
      />
      <FilterDocs />
    </div>
  );
};

export default NotesBelowHero;
