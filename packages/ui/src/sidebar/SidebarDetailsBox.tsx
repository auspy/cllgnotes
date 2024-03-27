import { DetailTabProps } from "@cllgnotes/types";
import SidebarDetailsBoxItem from "./SidebarDetailsBoxItem";

const SidebarDetailsBox = ({ labels }: { labels: DetailTabProps[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {Array.isArray(labels) &&
        labels.map((label, index) => (
          <>
            <SidebarDetailsBoxItem key={index} {...label} />
          </>
        ))}
    </div>
  );
};

export default SidebarDetailsBox;
