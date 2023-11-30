import {
  dummyFilterGrpsDocType,
  dummyFilterGrpsSubject,
} from "@cllgnotes/lib/dummyData";
import { AddFilterProps } from "@cllgnotes/types";
import { ButtonRow, Text } from "ui";

const Suggestions = ({ addFilter }: AddFilterProps) => {
  return (
    <div>
      <Text textClass="mb20" type="h3">
        What are you searching for?
      </Text>
      {/* <ButtonRow data={dummyFilterGrpsDocType} maxWidth={434} minWidth={220} /> */}
      <ButtonRow
        onClick={(e, chip) => {
          addFilter(chip);
        }}
        data={dummyFilterGrpsSubject}
        // maxWidth={318}
        minWidth={220}
        height={90}
      />
    </div>
  );
};

export default Suggestions;
