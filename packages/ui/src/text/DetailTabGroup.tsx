import { DetailTabGroupProps } from "@cllgnotes/types";
import DetailTab from "./DetailTab";

const DetailTabGroup = ({ data }: DetailTabGroupProps) => {
  // console.log("detailTabGroup is ssr");
  const isMobile = false;
  return (
    <div
      className={`${isMobile ? "fcfs w100" : "frc"} lg:mt60`}
      style={{ gap: isMobile ? 10 : 50 }}
    >
      {data.map((dt, i) => (
        <DetailTab key={i + dt.title} value={dt.value} title={dt.title} />
      ))}
    </div>
  );
};

export default DetailTabGroup;
