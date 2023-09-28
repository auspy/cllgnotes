import { NotesData, PaperData, DocData } from "./fragments/docFragments";
import { gql } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";

export const cacheOptions = {
  possibleTypes: {
    Doc: ["Notes", "Paper"],
    DocResData: ["Notes", "Paper", "updateRes"],
  },
  fragments: createFragmentRegistry(gql`
    ${NotesData + PaperData + DocData}
  `),
};
