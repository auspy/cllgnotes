import { DetailTabProps } from "@cllgnotes/types";
import Text from "./Text";

const DetailTab = ({ title, value }: DetailTabProps) => {
  return (
    <div>
      <Text color="dGrey" type="medi12" textTransform="uppercase">
        {title}
      </Text>
      <Text textClass="mt5" type="h3" textTransform="capitalize">
        {value}
      </Text>
    </div>
  );
};

export default DetailTab;
