import { resolverDocs, resolverMutDocs } from "./resolvers/resolver.docs.js";

const docType = (obj) => {
  // console.log(obj, "doc type");
  if (obj.testType) return "Paper";
  else return "Notes";
  return null;
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
  Course: {
    __resolveType(obj) {
      if (obj.departId?.name) return "CoursePopulated";
      return "CourseData";
    },
  },
  Subject: {
    __resolveType(obj) {
      if (obj.courseId?.name) return "SubjectPopulated";
      return "SubjectData";
    },
  },
  Doc: {
    __resolveType(obj) {
      return docType(obj);
    },
  },
  Query: {
    ...resolverDocs,
  },
  Mutation: {
    ...resolverMutDocs,
    // ...resolverAuth,
  },
};
export default resolvers;
