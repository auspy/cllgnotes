import { DocsQueryProps } from "@cllgnotes/types/types.gql";
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
  typePolicies: {
    Query: {
      fields: {
        getFilteredDocs: {
          keyArgs: false as false,
          merge(
            existing = { data: [] },
            incoming: DocsQueryProps["getFilteredDocs"]
          ) {
            if (incoming === undefined) {
              // console.log("incoming is undefined");
              return existing;
            }
            const count = incoming.count;
            const totalDocsAfterMerge =
              Array.isArray(existing.data) &&
              Array.isArray(incoming.data) &&
              existing.data.length + incoming.data.length;
            if (
              typeof totalDocsAfterMerge == "number" &&
              typeof count == "number" &&
              totalDocsAfterMerge > count
            ) {
              // console.log("totalDocsAfterMerge", totalDocsAfterMerge);
              return existing;
            }
            // console.log("adding fetched to existing");
            return {
              ...incoming,
              data: [...existing.data, ...(incoming?.data || [])],
            };
          },
        },
      },
    },
  },
};
