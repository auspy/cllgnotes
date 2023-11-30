import { BenefitsProps } from "@cllgnotes/types";
import BenefitsItem from "./BenefitsItem";

const Benefits = ({ data }: BenefitsProps) => {
  return (
    <div className="topContainer w100 fcc" style={{}}>
      {data.map((item, index) => (
        <BenefitsItem
          key={index}
          {...item}
          style={{ paddingBlockStart: index === 0 ? 0 : "none", ...item.style }}
        />
      ))}
    </div>
  );
};

export default Benefits;
