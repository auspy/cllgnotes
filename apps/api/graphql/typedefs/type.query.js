const typeQuery = `#related to queries
type Query {
    # DOCS
    getDoc(id: ID!,userId:String): docRes!
    getDocs: docRes!
    getPurchasedDocs(userId:String): docRes!
    getCreatedDocs: docRes!
    getFilteredDocs(filter: String,page:Int,pageSize:Int,search:String): docRes!
    Courses: [Course] 
    Departments: [Department] 
    Subjects: [Subject] 
    Autocomplete(search:String,filter: String): [Autocomplete]
}`;
export default typeQuery;
