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
    description: String
    price: Float
    imageLink: String!
    published: Boolean!
    createdAt: String!
    creator: Creator!
    likedBy: [String]
    rating: Float
    purchaseCount: Int
    course: String
    department: String
    year: Int
    university: String
    topic: [String]
    subject: String
    chapters: [String]
  }
input CreateDocInput {
    title: String!
    description: String
    price: Float
    imageLink: String!
    published: Boolean!
    course: String
    department: String
    year: Int
    university: String
    topic: [String!]!
    subject: String!
    chapters: [String!]!
}
input UpdateDocInput {
    title: String
    description: String
    price: Float
    imageLink: String
    published: Boolean
    course: String
    department: String
    year: Int
    university: String
    topic: [String]
    subject: String
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
