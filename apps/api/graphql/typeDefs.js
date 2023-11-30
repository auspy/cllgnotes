import typeAuth from "./typedefs/type.auth.js";
import typeDocs from "./typedefs/type.docs.js";
import typeMongodb from "./typedefs/type.mongodb.js";
import typeMutation from "./typedefs/type.mutation.js";
import typeQuery from "./typedefs/type.query.js";
import typeUser from "./typedefs/type.user.js";

const typeDefs = [
  typeDocs,
  typeUser,
  typeAuth,
  typeMongodb,
  typeQuery,
  typeMutation,
];

// console.log(typeDefs);
export default typeDefs;
