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
}
interface DocCommon{
    _id: ID!
    img: String!
    published: Boolean!
    type: docType!
    subject: String
    subjectCode: String
    pageCount: Int
    createdAt: String
    tLikes: Int
    rating: Float
    purchaseCount: Int
    course: String
    department: String
    semester: Int
    year: Int
    university: String
    creator: Creator
    price: Float
    isPurchased: Boolean
}
type Notes implements DocCommon {
    _id: ID!
    title: String!
    img: String!
    type: docType!
    published: Boolean!
    creator: Creator!
    subject: String
    subjectCode: String
    desc: String
    price: Float
    pageCount: Int
    createdAt: String
    tLikes: Int
    rating: Float
    purchaseCount: Int
    isPurchased: Boolean
    # make them mandatory
    course: String
    department: String
    year: Int
    semester: Int
    university: String
    topics: [String]
    units: [String]
    # subjectCode: SubjectCode
    # subject: Subjects
  }
type Paper implements DocCommon {
    _id: ID!
    img: String!
    pageCount: Int
    published: Boolean!
    createdAt: String
    creator: Creator!
    type: docType!
    testType: TestType!
    subject: String
    subjectCode: String
    tLikes: Int
    rating: Float
    purchaseCount: Int
    price: Float
    isPurchased: Boolean
    # make them mandatory
    course: String
    department: String
    semester: Int
    year: Int
    university: String
}
enum TestType{
    mst1
    mst2
    endSem
    # assignment
    # quiz
    # surpriseTest
    # classTest
    # practical
    # labTest
    # project
    # viva
    other
}
union Doc = Notes | Paper
input CreateDocInput {
    title: String
    desc: String
    price: Float
    img: Upload!
    type: docType!
    published: Boolean!
    course: String
    department: String
    semester: Int
    year: Int
    university: String
    topics: [String]
    subject: String
    subjectCode: String
    units: [String]
    testType: TestType
}
input UpdateDocInput {
    title: String
    desc: String
    price: Float
    # img: Upload #cant change img for now. will add this feature later
    type: docType
    testType: TestType
    published: Boolean
    course: String
    department: String
    semester: Int
    year: Int
    university: String
    topics: [String]
    subject: String
    subjectCode: String
    units: [String]
}
union DocResData = Notes | Paper | updateRes
type docRes{
    msg: String
    err: String
    status: String!
    data: [DocResData!]
    count: Int
}`;

export default typeDocs;

// enum Chapters{
//     Essentials of Communication
//     test
// }
// enum Subjects {
//     Maths
//     Physics
//     Chemistry
//     Biology
//     Computer
//     English
//     Hindi
// }
// enum SubjectCode {
//     _20MA0102
//     _123
//     _11
//     _22
//     _1
//     _2
//     _3
// }
// enum Topics{
//     Maths
//     Physics
//     Chemistry
//     Biology
//     Computer
//     English
//     Hindi
//     Sanskrit
//     History
//     Geography
//     Civics
//     Economics
//     BusinessStudies
// }
