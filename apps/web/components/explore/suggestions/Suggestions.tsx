import {
  dummyFilterGrpsDocType,
  dummyFilterGrpsSubject,
} from "@cllgnotes/lib/dummyData";
import { ButtonRow, Text } from "ui";

const Suggestions = () => {
  return (
    <div>
      <Text textClass="mb20" type="h3">
        What are you searching for?
      </Text>
      {/* <ButtonRow data={dummyFilterGrpsDocType} maxWidth={434} minWidth={220} /> */}
      <ButtonRow
        data={dummyFilterGrpsSubject}
        // maxWidth={318}
        minWidth={220}
        height={90}
      />
    </div>
  );
};

export default Suggestions;
