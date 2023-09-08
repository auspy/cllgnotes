import { BenefitsProps } from "@cllgnotes/types";
import BenefitsItem from "./BenefitsItem";

const Benefits = ({ data }: BenefitsProps) => {
  return (
    <div
      className="topContainer w100 fcc"
      style={{
        rowGap: 50,
      }}
    >
      {data.map((item, index) => (
        <BenefitsItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Benefits;
