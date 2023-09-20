// "!" means that the field is necessary in response
const typeDocs = `#related to docs
scalar Upload
type Creator{
    _id: ID!
    username: String!
    createdDocs: [Doc!]!
}
enum docType{
    notes
    paper
    presentation
}
type Doc {
    _id: ID!
    title: String!
    desc: String
    price: Float
    img: String!
    pageCount: Int
    type: docType!
    published: Boolean!
    createdAt: String
    creator: Creator!
    tLikes: Int
    rating: Float
    purchaseCount: Int
    course: String
    department: String
    year: Int
    university: String
    topic: [String]
   # subject: Subjects!
    subject: String!
   # subjectCode: SubjectCode!
    subjectCode: String!
    chapters: [String]
  }
input CreateDocInput {
    title: String!
    desc: String
    price: Float
    img: Upload!
    type: docType!
    published: Boolean!
    course: String
    department: String
    year: Int
    university: String
    topic: [String!]!
    subject: String!
    subjectCode: String!
    chapters: [String!]!
}
enum Chapters{
    Essentials of Communication
    test
}
enum Subjects {
    Maths
    Physics
    Chemistry
    Biology
    Computer
    English
    Hindi
}
enum SubjectCode {
    _20MA0102
    _123
    _11
    _22
    _1
    _2
    _3
}
enum Topics{
    Maths
    Physics
    Chemistry
    Biology
    Computer
    English
    Hindi
    Sanskrit
    History
    Geography
    Civics
    Economics
    BusinessStudies
}
input UpdateDocInput {
    title: String
    desc: String
    price: Float
    # img: Upload #cant change img for now. will add this feature later
    type: docType
    published: Boolean
    course: String
    department: String
    year: Int
    university: String
    topic: [String]
    subject: String
    subjectCode: String
    chapters: [String]
}
union DocResData = Doc | updateRes
type docRes{
    msg: String
    err: String
    status: String!
    data: [DocResData!]
}`;

export default typeDocs;
