import { resolverDocs, resolverMutDocs } from "./resolvers/resolver.courses.js";
import resolverAuth from "./resolvers/resolvers.auth.js";

const resolvers = {
  DocResData: {
    __resolveType(obj) {
      // console.log(obj, "resolve type");
      if (obj._id) return "Doc";
      if (obj.acknowledged) return "updateRes";
      return null;
    },
  },
  Query: {
    ...resolverDocs,
  },
  Mutation: {
    ...resolverMutDocs,
    ...resolverAuth,
  },
};
export default resolvers;
