import Image from "next/image";
import ButtonBuyNow from "../../../../apps/web/components/buttons/ButtonBuyNow";

const PurchaseToRead = ({ price, _id }: { price: number; _id: string }) => {
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
      <ButtonBuyNow
        text="Purchase To read"
        amount={price}
        _id={_id}
        buttonClass="mt20"
      />
    </div>
  );
};

export default PurchaseToRead;
