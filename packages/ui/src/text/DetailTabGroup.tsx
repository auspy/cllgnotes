import { DetailTabGroupProps } from "@cllgnotes/types";
import DetailTab from "./DetailTab";

const DetailTabGroup = ({
  data,
  className,
}: DetailTabGroupProps & { className?: string }) => {
  // console.log("detailTabGroup is ssr");
  return (
    <div
      className={`flex flex-col items-start gap-3 lg:flex-wrap lg:flex-row lg:item-center lg:gap-x-10 lg:gap-y-3 lg:mt60 ${className} `}
    >
      {Array.isArray(data) &&
        data.map((dt, i) => (
          <DetailTab key={i + dt.title} value={dt.value} title={dt.title} />
        ))}
    </div>
  );
};

export default DetailTabGroup;
