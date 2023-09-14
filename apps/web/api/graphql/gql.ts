// all graphql queries and mutations are defined here
// queries
import GET_DOCS from "./queries/getDocs.graphql";
import GET_DOC from "./queries/getADoc.graphql";
import GET_PURCHASED_DOCS from "./queries/getPurchasedDocs.graphql";
import GET_CREATED_DOCS from "./queries/getCreatedDocs.graphql";
// mutations
import CREATE_DOC from "./mutations/addDoc.graphql";
import UPDATE_DOC from "./mutations/updateDoc.graphql";
import PURCHASE_DOC from "./mutations/purchaseDoc.graphql";
import LOGIN from "./mutations/login.graphql";
import REGISTER from "./mutations/register.graphql";
import LOGOUT from "./mutations/logout.graphql";

export {
  GET_DOCS,
  GET_DOC,
  GET_PURCHASED_DOCS,
  GET_CREATED_DOCS,
  CREATE_DOC,
  UPDATE_DOC,
  PURCHASE_DOC,
  LOGIN,
  REGISTER,
  LOGOUT,
};
