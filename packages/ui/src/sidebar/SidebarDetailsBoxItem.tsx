import { DetailTabProps } from "@cllgnotes/types";
import Text from "../text/Text";
import { convertCamelCaseToSentence } from "@cllgnotes/lib";

const SidebarDetailsBoxItem = ({ value, title }: DetailTabProps) => {
  return (
    <div className="frfssb">
      <Text color="dGrey" type="medi12" textTransform="capitalize">
        {convertCamelCaseToSentence(title)}
      </Text>
      <Text
        textClass="max-w-[160px] text-right"
        color="dark"
        type="semi12"
        textTransform="capitalize"
      >
        {value}
      </Text>
    </div>
  );
};

export default SidebarDetailsBoxItem;
