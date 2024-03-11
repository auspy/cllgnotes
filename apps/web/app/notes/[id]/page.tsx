import { getClient } from "@/api/graphql/ApolloClient";
import { GET_DOC } from "@/api/graphql/gql";
import Footer from "@/components/footer/Footer";
import useServerSession from "@/components/hooks/useServerSession";
import NotesBelowHero from "@/components/notes/NotesBelowHero";
import NotesHero from "@/components/notes/NotesHero";
import { DetailTabProps, DocProps, DocsQueryProps } from "@cllgnotes/types";
import { MovingBanner, PreviewPdf } from "ui";

const page = async ({ params }: { params: { id: string } }) => {
  // console.log(params, "params", params["id"]);
  const session = (await useServerSession()) as any;
  console.log(session, "in page");
  const { data } = await getClient().query<DocsQueryProps>({
    query: GET_DOC,
    variables: { id: String(params["id"]), userId: session?.user?._id },
  });
  const doc: DocProps | undefined = data?.getDoc?.data?.[0];
  const status = data?.getDoc?.status;
  const foundCourses = status == "success";
  const isPurchased = data?.getDoc?.data?.[0].isPurchased;
  console.log(doc?.subject);
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
      "creator",
      "isPurchased",
    ];
    const arr: DetailTabProps[] = [];
    for (const key in doc) {
      if (!notNeededLabels.includes(key) && doc[key as keyof DocProps]) {
        if (Array.isArray(doc[key as keyof DocProps])) {
          if ((doc[key as keyof DocProps] as any)?.length > 0) {
            arr.push({
              title: key,
              value: (doc[key as keyof DocProps] as any)?.join(", "),
            });
          }
          continue;
        }
        // if (key == "creator") {
        //   arr.push({ title: key, value: doc[key].username });
        //   continue;
        // }
        arr.push({
          title: key,
          value:
            typeof doc[key as keyof DocProps] == "string"
              ? (doc[key as keyof DocProps] as any)
              : doc[key as keyof DocProps]?.name,
        });
      }
    }
    return arr;
  };
  return (
    <>
      <NotesHero
        {...doc}
        _id={params.id}
        img={{ src: doc.img || "", alt: doc.title || "", fill: true }}
        labels={labels()}
        notPurchased={!isPurchased}
        textBoxProps={{
          department: doc.department!,
          course: doc.course!,
          year: doc.year!,
        }}
      />
      <div className="topContainer mt-[350px] sm:mt-[200px] lg:mt-[40px] mb-[100px] fcfs">
        <PreviewPdf
          type={doc.type}
          notPurchased={!isPurchased}
          totalPages={doc.pageCount || 0}
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
