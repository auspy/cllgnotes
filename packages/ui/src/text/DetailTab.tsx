import { DetailTabProps } from "@cllgnotes/types";
import Text from "./Text";

const DetailTab = ({ title, value }: DetailTabProps) => {
  return (
    <div>
      <Text color="dGrey" type="medi10" textTransform="uppercase">
        {title}
      </Text>
      <Text textClass="mt5" type="semi16" textTransform="capitalize">
        {value}
      </Text>
    </div>
  );
};

export default DetailTab;
