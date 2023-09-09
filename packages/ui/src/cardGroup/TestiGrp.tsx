import { GradientColors, TestiCardGrpProps } from "@cllgnotes/types";
import TestiCard from "../cards/TestiCard";
import ShowMoreBtn from "../buttons/ShowMoreBtn";
const TestiGrp = ({ data }: TestiCardGrpProps) => {
  return (
    <div
      className="columns-2 md:columns-3 lg:columns-5 rPosi"
      style={{
        gap: 20,
        height: "100%",
        overflow: "hidden",
        maxWidth: 1370,
        width: "100%",
        maxHeight: 600,
      }}
    >
      <div
        id="testiGrad"
        className="fccc"
        style={{
          height: "70%",
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          background: GradientColors.white,
          zIndex: 2,
        }}
      >
        <div style={{ position: "relative", top: 50 }}>
          <ShowMoreBtn />
        </div>
      </div>
      {data.map((cardData, i) => (
        <TestiCard key={i + cardData.text} {...cardData} _class="mb20" />
      ))}
    </div>
  );
};

export default TestiGrp;
