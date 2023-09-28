import { getClient } from "@/api/graphql/ApolloClient";
import { GET_DOC } from "@/api/graphql/gql";
import Footer from "@/components/footer/Footer";
import NotesBelowHero from "@/components/notes/NotesBelowHero";
import NotesHero from "@/components/notes/NotesHero";
import { DetailTabProps, DocsQueryProps } from "@cllgnotes/types";
import { log } from "logger";
import { MovingBanner, PreviewPdf } from "ui";

const page = async ({ params }) => {
  // console.log(params, "params", params["id"]);

  const { data } = await getClient().query<DocsQueryProps>({
    query: GET_DOC,
    variables: { id: String(params["id"]) },
  });
  const doc = data?.getDoc?.data?.[0];
  const status = data?.getDoc?.status;
  const foundCourses = status == "success";

  log(data);
  if (!doc || !foundCourses) {
    return <h2>no data found</h2>;
  }
  const labels = () => {
    const notNeededLabels = [
      "_id",
      "img",
      "title",
      "desc",
      "__typename",
      "published",
      "year",
      "course",
      "department",
    ];
    const arr: DetailTabProps[] = [];
    for (const key in doc) {
      if (!notNeededLabels.includes(key) && doc[key]) {
        if (Array.isArray(doc[key])) {
          arr.push({ title: key, value: doc[key].join(", ") });
          continue;
        }
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
        _id={params.id}
        img={{ src: doc.img || "", alt: doc.title || doc.subject, fill: true }}
        title={doc.title}
        desc={doc.desc || ""}
        labels={labels()}
        subject={doc.subject}
        subjectCode={doc.subjectCode}
        testType={doc.testType}
        type={doc.type}
        price={doc.price || 0}
        textBoxProps={{
          department: doc.department!,
          course: doc.course!,
          year: doc.year!,
        }}
      />
      <div className="topContainer mt-[350px] sm:mt-[200px] lg:mt-[40px] mb-[100px] fcfs">
        <PreviewPdf
          type={doc.type}
          notPurchased={true}
          totalPages={doc.pageCount}
          img={{
            src: doc.img || "",
            alt: doc.title || "",
            height: 1348,
            width: 955,
          }}
          _id={doc._id}
          price={doc.price || 0}
        />
      </div>
      <MovingBanner
        textType="h1e"
        text="🥰 You might also like 😍 You might also like "
        repeat={3}
      />
      <div className="topContainer mt30 mb-[100px]">
        <NotesBelowHero />
      </div>
      <Footer earnMoney={true} />
    </>
  );
};

export default page;
