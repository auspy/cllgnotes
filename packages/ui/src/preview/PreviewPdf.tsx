import { defaultImg } from "@cllgnotes/lib";
import { Borders, GradientColors } from "@cllgnotes/types";
import Image from "next/image";
import PurchaseToRead from "../cards/PurchaseToRead";

const PreviewPdf = () => {
  const notLoggedIn = true;
  const img = { ...defaultImg };
  return (
    <div
      className="w100 rPosi grid"
      style={{
        maxWidth: 955,
      }}
    >
      <PurchaseToRead />
      <div
        className="w100 fcc"
        style={{
          border: Borders.dark,
          height: 1348,
          borderRadius: 5,
        }}
      >
        {/* gradient to hide */}
        {notLoggedIn && (
          <div
            className="w-[99.6%] h-[99.8%] aPosi b-0 l-0"
            style={{ background: GradientColors.pdf, zIndex: 1 }}
          ></div>
        )}

        <Image style={{ padding: 2, borderRadius: 5 }} {...img} />
      </div>
    </div>
  );
};

export default PreviewPdf;
