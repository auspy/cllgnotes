import { DetailTabProps } from "@cllgnotes/types";
import Text from "./Text";
import { convertCamelCaseToSentence } from "@cllgnotes/lib";

const DetailTab = ({ title, value }: DetailTabProps) => {
  return (
    <div>
      <Text color="dGrey" type="medi12" textTransform="uppercase">
        {convertCamelCaseToSentence(title)}
      </Text>
      <Text
        textClass="mt5 lg:max-w-[260px]"
        type="semi16"
        textTransform="capitalize"
      >
        {value}
      </Text>
    </div>
  );
};

export default DetailTab;
