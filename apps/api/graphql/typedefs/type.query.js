const typeQuery = `#related to queries
type Query {
    # DOCS
    getDoc(id: ID!,userId:String): docRes!
    getDocs: docRes!
    getPurchasedDocs: docRes!
    getCreatedDocs: docRes!
}`;
export default typeQuery;
