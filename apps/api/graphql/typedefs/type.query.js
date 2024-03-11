const typeQuery = `#related to queries
type Query {
    # DOCS
    getDoc(id: ID!,userId:String): docRes!
    getDocs: docRes!
    getPurchasedDocs(userId:String): docRes!
    getCreatedDocs: docRes!
    getFilteredDocs(filter: String,page:Int,pageSize:Int,search:String): docRes!
}`;
export default typeQuery;
