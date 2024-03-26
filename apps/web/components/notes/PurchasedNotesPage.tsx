import { DetailTabProps, DocProps } from "@cllgnotes/types";
import { Logo, MovingBanner, PdfSidebar, RightSidebar } from "ui";
import NotesPageTextBox from "./NotesPageTextBox";
import Comments from "../Comments";
import NotesToolbar from "../preview/NotesToolbar";
import PreviewPdf from "../preview/PreviewPdf";

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
      <div
        id="toolbarContainer"
        className=" w-full lg:pr-[300px] px-5 lg:pl-0 lg:w-10/12 fixed top-[10px] z-10
       frcsb"
      >
        <Logo />
        <NotesToolbar />
      </div>
      <div
        id="pdfContainer"
        data-fullscreen="false"
        className=" group/pdf  mt-[80px] lg:mb-[100px] flex flex-col w-full items-center gap-10"
      >
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
          <Comments projectId={doc?._id} searchParams={searchParams} />
        </RightSidebar>
      </div>
    </>
  );
};

export default PurchasedNotesPage;
