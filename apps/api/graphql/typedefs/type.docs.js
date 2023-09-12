// "!" means that the field is necessary in response
const typeDocs = `#related to docs
type Creator{
    _id: ID!
    username: String!
    createdDocs: [Doc!]!
}
type Doc {
    _id: ID!
    title: String!
    desc: String
    price: Float
    img: String!
    published: Boolean!
    createdAt: String
    creator: Creator!
    likedBy: [String]
    rating: Float
    purchaseCount: Int
    course: String
    department: String
    year: Int
    university: String
    topic: [String]
    subject: Subjects!
    subjectCode: SubjectCode!
    chapters: [String]
  }
input CreateDocInput {
    title: String!
    desc: String
    price: Float
    img: String!
    published: Boolean!
    course: String
    department: String
    year: Int
    university: String
    topic: [Topics!]!
    subject: Subjects!
    subjectCode: SubjectCode!
    chapters: [Chapters!]!
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
    img: String
    published: Boolean
    course: String
    department: String
    year: Int
    university: String
    topic: [String]
    subject: Subjects
    subjectCode: SubjectCode
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
