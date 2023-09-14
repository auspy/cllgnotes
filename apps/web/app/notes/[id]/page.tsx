import { getClient } from "@/api/graphql/ApolloClient";
import { GET_DOCS } from "@/api/graphql/gql";
import Footer from "@/components/footer/Footer";
import NotesBelowHero from "@/components/notes/NotesBelowHero";
import NotesHero from "@/components/notes/NotesHero";
import { DetailTabProps, DocsQueryProps } from "@cllgnotes/types";
import { log } from "logger";
import { MovingBanner, PreviewPdf } from "ui";

const page = async ({ params }) => {
  const { data } = await getClient().query<DocsQueryProps>({
    query: GET_DOCS,
    variables: { id: params.id || "64ffd9eb884f58895d58b51e" },
  });
  const doc = data?.getDocs?.data?.[0];
  const status = data?.getDocs?.status;
  const foundCourses = status == "success";

  log(data);
  if (!doc) {
    return <h2>no data found</h2>;
  }
  const labels = () => {
    log("labels function called");
    const neededLabels = [
      "department",
      "semester",
      "subject",
      "course",
      "year",
      "subjectCode",
      "creator",
    ];
    const arr: DetailTabProps[] = [];
    for (const key of neededLabels) {
      if (doc[key]) {
        if (key == "creator") {
          arr.push({ title: key, value: doc[key].username });
          continue;
        }
        arr.push({ title: key, value: doc[key] });
      }
    }
    return arr;
  };
  return (
    <>
      <NotesHero
        img={{ src: doc.img || "", alt: doc.title || "", fill: true }}
        title={doc.title}
        desc={doc.desc || ""}
        labels={labels()}
      />
      <div className="topContainer mt40 mb-[100px] fcfs">
        <PreviewPdf
          notPurchased={false}
          img={{ src: doc.img || "", alt: doc.title || "", fill: true }}
        />
      </div>
      <MovingBanner
        textType="h1e"
        text="🥰 You might also like 🥰 You might also like 😍 You might also like 😍"
      />
      <div className="topContainer mt30 mb-[100px]">
        <NotesBelowHero />
      </div>
      <Footer earnMoney={true} />
    </>
  );
};

export default page;
