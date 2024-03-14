import TrendingDocs from "../docs/TrendingDocs";

const NotesBelowHero = () => {
  //   const { data } = useSuspenseQuery<DocsQueryProps>(GET_DOCS);
  //   const foundCourses = data?.getDocs?.status == "success";
  //   log(data);
  return (
    <div className="flex flex-col" style={{ gap: 30 }}>
      {/* @ts-expect-error Server Component */}
      <TrendingDocs />
    </div>
  );
};

export default NotesBelowHero;
