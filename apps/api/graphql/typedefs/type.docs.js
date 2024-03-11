// "!" means that the field is necessary in response
const typeDocs = `#related to docs
scalar Upload
type Creator{
    _id: ID!
    username: String
    createdDocs: [Doc]
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
    subject: Subject
    pageCount: Int
    createdAt: String
    tLikes: Int
    rating: Float
    purchaseCount: Int
    course: Course
    department: Department
    semester: Int
    year: Int
    university: Univ
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
    subject: Subject
    desc: String
    price: Float
    pageCount: Int
    createdAt: String
    tLikes: Int
    rating: Float
    purchaseCount: Int
    isPurchased: Boolean
    # make them mandatory
    course: Course
    #courseData: Course
    department: Department
    year: Int
    semester: Int
    university: Univ
    topics: [String]
    units: [String]
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
    subject: Subject
    tLikes: Int
    rating: Float
    purchaseCount: Int
    price: Float
    isPurchased: Boolean
    course: Course
    department: Department
    semester: Int
    year: Int
    university: Univ
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
    course: ID
    department: ID
    semester: Int
    year: Int
    university: ID
    topics: [String]
    subject: ID
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
    course: ID
    department: ID
    semester: Int
    year: Int
    university: ID
    topics: [String]
    subject: ID
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
