import { BenefitItemProps, Borders } from "@cllgnotes/types";
import { AnimateWrapper, Text } from "ui";

const BenefitsItem = ({ title, desc, isRight, style }: BenefitItemProps) => {
  return (
    <div
      className="w100"
      style={{
        borderBottom: Borders.dark,
        paddingBlock: "5%",
        gap: 20,
        ...style,
      }}
    >
      <AnimateWrapper elementId="benefitItem" animation="slideIn" />
      <div
        className={`frfesb overflow-hidden items-start flex-col sm:items-end w100 ${
          isRight ? "sm:flex-row-reverse" : "sm:flex-row"
        }`}
      >
        <h1
          className={`benefitItem expose upper frc ${
            isRight ? "sm:text-right" : "text-left"
          } `}
          style={{
            fontSize: "clamp(64px, 7vw,100px)",
          }}
        >
          {title}
        </h1>
        <Text
          textClass="benefitItem"
          textStyle={{ maxWidth: 271 }}
          type="medi16"
        >
          {desc}
        </Text>
      </div>
    </div>
  );
};

export default BenefitsItem;
