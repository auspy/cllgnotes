import { Borders, GradientColors, PreviewPdf } from "@cllgnotes/types";
import Image from "next/image";
import PurchaseToRead from "../cards/PurchaseToRead";

const PreviewPdf = ({ notPurchased = true, img }: PreviewPdf) => {
  return (
    <div
      className="w100 rPosi grid"
      style={{
        maxWidth: 955,
      }}
    >
      {notPurchased && <PurchaseToRead />}
      <div
        className="w100 fcc"
        style={{
          border: Borders.dark,
          height: 1348,
          borderRadius: 5,
        }}
      >
        {/* gradient to hide */}
        {notPurchased && (
          <div
            className="w-[99.6%] h-[99.8%] aPosi b-0 l-0"
            style={{ background: GradientColors.pdf, zIndex: 1 }}
          ></div>
        )}

        <Image
          style={{ padding: 2, borderRadius: 5, objectFit: "cover" }}
          {...img}
        />
      </div>
    </div>
  );
};

export default PreviewPdf;
