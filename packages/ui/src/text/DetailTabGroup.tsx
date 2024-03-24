import { DetailTabGroupProps } from "@cllgnotes/types";
import DetailTab from "./DetailTab";

const DetailTabGroup = ({
  data,
  className,
}: DetailTabGroupProps & { className?: string }) => {
  // console.log("detailTabGroup is ssr");
  return (
    <div
      className={`flex  gap-3 sm:flex-wrap flex-row item-center overflow-scroll md:overflow-auto sm:gap-x-10 sm:gap-y-3 lg:mt60 ${className} `}
    >
      {Array.isArray(data) &&
        data.map((dt, i) => (
          <DetailTab key={i + dt.title} value={dt.value} title={dt.title} />
        ))}
    </div>
  );
};

export default DetailTabGroup;
