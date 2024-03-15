import { CardGrpProps } from "@cllgnotes/types";
import ListItem from "./ListItem";
import { CircularProgress } from "@mui/material";

const List = ({ data, lastRef, loadingMore }: CardGrpProps) => {
  if (!(Array.isArray(data) && data.length > 0)) {
    return null;
  }
  return (
    <div className="w100 fcc" style={{ rowGap: 15 }}>
      {data.map((card, i) => (
        <ListItem
          lastRef={i === data.length - 1 ? lastRef : undefined}
          {...card}
          key={i}
        />
      ))}
      {loadingMore && <CircularProgress size={14} />}
    </div>
  );
};

export default List;
