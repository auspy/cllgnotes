import { DetailTabProps, DocProps } from "@cllgnotes/types";
import { Logo, MovingBanner, PreviewPdf, RightSidebar } from "ui";
import NotesPageTextBox from "./NotesPageTextBox";
import Comments from "../Comments";
import { NotesToolbar } from "ui";
const PurchasedNotesPage = ({
  doc,
  labels,
  isPurchased,
  searchParams,
}: {
  doc?: DocProps;
  isPurchased: boolean;
  labels: DetailTabProps[];
  searchParams?: any;
}) => {
  if (!doc) {
    return null;
  }
  return (
    <>
      <div className=" w-10/12 fixed top-[10px] z-10 pr-[300px] frcsb">
        <Logo />
        <NotesToolbar />
      </div>
      <div className="  mt-[80px] mb-[100px] frfs">
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
        <RightSidebar>
          <NotesPageTextBox
            notPurchased={!isPurchased}
            labels={labels}
            {...doc}
          />
          <MovingBanner
            textType="h3e"
            text="✍️ comments ✏️ comments"
            repeat={3}
          />
          {/* @ts-expect-error Server Component */}
          <Comments projectId={doc?._id} searchParams={searchParams} />
        </RightSidebar>
      </div>
    </>
  );
};

export default PurchasedNotesPage;
