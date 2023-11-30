import { CardGrpProps } from "@cllgnotes/types";
import ListItem from "./ListItem";

const List = ({ data }: CardGrpProps) => {
  return (
    <div className="w100 fcc" style={{ rowGap: 15 }}>
      {data.map((card, i) => (
        <ListItem {...card} key={i} />
      ))}
    </div>
  );
};

export default List;
