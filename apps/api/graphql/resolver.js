import { resolverDocs, resolverMutDocs } from "./resolvers/resolver.docs.js";
import {
  resolverComments,
  resolverMutComments,
} from "./resolvers/resolver.comment.js";

const docType = (obj) => {
  // console.log(obj, "doc type");
  if (obj.title) return "Notes";
  else return "Paper";
};

const resolvers = {
  DocResData: {
    __resolveType(obj) {
      // console.log(obj, "resolve type");
      if (obj.acknowledged) return "updateRes";
      if (obj._id) {
        return docType(obj);
      }
      return null;
    },
  },
  Doc: {
    __resolveType(obj) {
      return docType(obj);
    },
  },
  Query: {
    ...resolverDocs,
    ...resolverComments,
  },
  Mutation: {
    ...resolverMutDocs,
    ...resolverMutComments,
    // ...resolverAuth,
  },
};
export default resolvers;
