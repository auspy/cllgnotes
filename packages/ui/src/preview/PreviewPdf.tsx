import { Borders, PreviewPdfProps } from "@cllgnotes/types";
import PdfImage from "./PdfImage";

const PreviewPdf = ({
  notPurchased = false,
  img,
  type,
  totalPages: tP,
  ...props
}: PreviewPdfProps) => {
  const totalPages = tP || 1;
  return (
    <div
      id="previewPdf"
      className={
        `flex flex-col  rPosi w-full lg:w-[80vw]   gap-4 h-fit` +
        (notPurchased ? "" : " pr-[300px] fcc")
      }
      style={
        {
          // maxWidth: 955,
        }
      }
    >
      {Array.from({ length: notPurchased ? 1 : totalPages }).map((_, index) => (
        <div
          key={index}
          className="w100 fcc bg-white overflow-hidden"
          style={{
            border: Borders.dark,
            maxHeight: 1348,
            maxWidth: 955,
            aspectRatio: "955/1348",
            borderRadius: 5,
          }}
        >
          <PdfImage
            index={index + 1}
            notPurchased={notPurchased}
            img={img}
            type={type}
          />
        </div>
      ))}
    </div>
  );
};

export default PreviewPdf;
