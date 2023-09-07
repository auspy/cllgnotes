import { log, logger } from "logger";
import { Button, ButtonBlack, ButtonRow, Heading, SearchBar, Text } from "ui";
import { CONSTANT_TEST } from "@cllgnotes/lib/constants";
import {
  ButtonFontSizes,
  ButtonFontSizesBlack,
} from "@cllgnotes/types/buttons";
import { FontFamilyType, HeadingType } from "@cllgnotes/types/types.text";
import {
  dummyFilterGrpsDocType,
  dummyFilterGrpsSubject,
} from "@cllgnotes/lib/dummyData/data.filterGrps";
export default function Page(): JSX.Element {
  console.log("Hello World");
  log("Hello World" + CONSTANT_TEST);
  return (
    <>
      <div className="p30 w100">
        <Button text="hello" fontSize={ButtonFontSizes.large} />
        <ButtonBlack text="show more" fontSize={ButtonFontSizesBlack.large} />
        <ButtonBlack text="login" fontSize={ButtonFontSizesBlack.small} />
        <Text text="tseing wow" type="h1" color="red" />
        <Heading
          type={HeadingType.h1}
          text={
            <>
              Notes & papers
              <br /> tailored to your
            </>
          }
          highlightText="college syllabus."
        />
        <ButtonRow
          data={dummyFilterGrpsDocType}
          maxWidth={434}
          minWidth={220}
        />
        <ButtonRow
          data={dummyFilterGrpsSubject}
          maxWidth={318}
          minWidth={220}
          height={90}
        />
        <SearchBar
          height={90}
          options={["Srm university", "ashoka university"]}
        />
      </div>
    </>
  );
}
