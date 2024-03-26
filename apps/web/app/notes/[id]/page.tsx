import { getClient } from "@/db/graphql/ApolloClient";
import { GET_DOC } from "@/db/graphql/gql";
import Footer from "@/components/footer/Footer";
import useServerSession from "@/components/hooks/useServerSession";
import NotesBelowHero from "@/components/notes/NotesBelowHero";
import NotesHero from "@/components/notes/NotesHero";
import { DetailTabProps, DocProps, DocsQueryProps } from "@cllgnotes/types";
import { MovingBanner } from "ui";
import PreviewPdf from "@/components/preview/PreviewPdf";
import Link from "next/link";
import PurchasedNotesPage from "@/components/notes/PurchasedNotesPage";

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { search: string };
}) => {
  // console.log(params, "params", params["id"]);
  const session: any = await useServerSession();
  // console.log(session, "in page");
  const { data } = await getClient().query<DocsQueryProps>({
    query: GET_DOC,
    variables: { id: String(params["id"]), userId: session?.user?._id },
  });
  const doc: DocProps | undefined = data?.getDoc?.data?.[0];
  const status = data?.getDoc?.status;
  const foundCourses = status == "success";
  const isPurchased = Boolean(session?.user?.name);
  if (!doc || !foundCourses) {
    return <Link href="/auth">Login to continue</Link>;
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
      "testtype",
      "type",
      // "course",
      // "department",
      // "creator",
      // "ispurchased",
    ];
    if (doc.type == "paper") {
      notNeededLabels.push("subject");
    }
    const arr: DetailTabProps[] = [];
    for (const k in doc) {
      const key = k.toLowerCase();
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
        const val =
          typeof doc[key as keyof DocProps] === "string"
            ? (doc[key as keyof DocProps] as any)
            : (doc[key as keyof DocProps] as any)?.name;
        if (val) {
          arr.push({
            title: key,
            value: val,
          });
        }
      }
    }
    return arr;
  };
  const allLabels = labels();
  // console.log(allLabels, "allLabels");
  if (isPurchased) {
    return (
      <PurchasedNotesPage
        searchParams={searchParams}
        doc={doc}
        labels={allLabels}
        isPurchased
      />
    );
  }
  return (
    <>
      <NotesHero
        {...doc}
        _id={params.id}
        img={{ src: doc.img || "", alt: doc.title || "", fill: true }}
        labels={allLabels}
        notPurchased={!isPurchased}
        textBoxProps={{
          department: doc.department!,
          course: doc.course!,
          year: doc.year!,
        }}
      />
      <div className="topContainer  mt-[40px] mb-[100px] fcfs">
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
