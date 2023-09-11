import { ButtonFontSizes } from "@cllgnotes/types";
import Image from "next/image";
import { ChevronRightRounded, Button } from "ui";

const PurchaseToRead = () => {
  return (
    <div
      className="card aPosi w100 p20 fccc"
      style={{
        justifySelf: "center",
        alignSelf: "center",
        maxWidth: 398,
        zIndex: 10,
      }}
    >
      <div className="w100 rPosi" style={{ height: 245, maxWidth: 250 }}>
        <Image src={"/images/reading.png"} alt="reading book" fill />
      </div>
      <Button
        buttonClasses="mt30"
        buttonStyles={{}}
        text="purchase to read"
        fontSize={ButtonFontSizes.large}
        icon={
          <ChevronRightRounded
            color="inherit"
            sx={{
              fontSize: 32,
            }}
            style={{ strokeWidth: 5 }}
          />
        }
      />
    </div>
  );
};

export default PurchaseToRead;
