import { Borders, PreviewPdfProps } from "@cllgnotes/types";
import PdfImage from "./PdfImage";

const PreviewPdf = ({
  notPurchased = false,
  img,
  type,
  totalPages: tP,
  _id,
  ...props
}: PreviewPdfProps) => {
  const totalPages = tP || 1;
  return (
    <div
      id="previewPdf"
      className={
        `flex flex-col   rPosi w-full lg:w-[80vw]   gap-4 h-fit` +
        (notPurchased
          ? ""
          : " lg:group-data-[fullscreen=false]/pdf:pr-[300px] fcc")
      }
      style={
        {
          // maxWidth: 955,
        }
      }
    >
      {Array.from({ length: notPurchased ? 1 : totalPages }).map((_, index) => (
        <div
          className={`relative w100 flex flex-col ${
            !notPurchased && "items-center"
          }`}
        >
          <div
            key={index}
            className="w100 h-full bg-white overflow-scroll scrollbar-hide"
            style={{
              border: Borders.dark,
              maxHeight: 1348,
              maxWidth: 955,
              aspectRatio: "955/1348",
              borderRadius: 5,
            }}
          >
            <PdfImage
              projectId={_id}
              index={index + 1}
              notPurchased={notPurchased}
              img={img}
              type={type}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviewPdf;
