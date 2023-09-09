import { BenefitItemProps, Borders } from "@cllgnotes/types";
import { Text } from "ui";

const BenefitsItem = ({ title, desc, isRight }: BenefitItemProps) => {
  return (
    <div
      className="frfesb w100"
      style={{
        flexDirection: isRight ? "row-reverse" : "row",
        borderBottom: Borders.dark,
        paddingBottom: 80,
      }}
    >
      <h1
        className="expose upper frc"
        style={{
          fontSize: 100,
          height: 67,
          // textShadow: "unset"
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
