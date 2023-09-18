import { BenefitItemProps, Borders } from "@cllgnotes/types";
import { Text } from "ui";

const BenefitsItem = ({ title, desc, isRight }: BenefitItemProps) => {
  return (
    <div
      className={`frfesb  items-start flex-col sm:items-end  w100 ${
        isRight ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
      style={{
        borderBottom: Borders.dark,
        paddingBlock: "7%",
        gap: 20,
      }}
    >
      <h1
        className={`expose upper frc ${
          isRight ? "sm:text-right" : "text-left"
        } `}
        style={{
          fontSize: "clamp(64px, 7vw,100px)",
        }}
      >
        {title}
      </h1>
      <Text textStyle={{ maxWidth: 271 }} type="medi16">
        {desc}
      </Text>
    </div>
  );
};

export default BenefitsItem;
