import typeAuth from "./typedefs/type.auth.js";
import { typeCourses } from "./typedefs/type.courses.js";
import { typeDeparts } from "./typedefs/type.department.js";
import typeDocs from "./typedefs/type.docs.js";
import { typeEduTypeEnum } from "./typedefs/type.eduType.js";
import typeMongodb from "./typedefs/type.mongodb.js";
import typeMutation from "./typedefs/type.mutation.js";
import typeQuery from "./typedefs/type.query.js";
import { typeSubjects } from "./typedefs/type.subjects.js";
import { typeUniv } from "./typedefs/type.univ.js";
import typeUser from "./typedefs/type.user.js";

const typeDefs = [
  typeDocs,
  typeUser,
  typeAuth,
  typeMongodb,
  typeQuery,
  typeMutation,
  typeEduTypeEnum,
  typeUniv,
  typeDeparts,
  typeCourses,
  typeSubjects,
];

// console.log(typeDefs);
export default typeDefs;
