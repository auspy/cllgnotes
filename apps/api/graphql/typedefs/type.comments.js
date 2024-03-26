export const typeComments = `
type Comment{
    _id: ID
    doc: Doc
    user: User
    x: Int!
    y: Int!
    page: Int!
    text: String!
    createdAt: String
    updatedAt: String
}

input CommentInput{
    doc: ID!
    user: ID
    x: Int!
    y: Int!
    page: Int!
    text: String!
}
input CommentUpdateInput{
    text: String
    x: Int
    y: Int
}
type commentRes{
    msg: String
    err: String
    status: String!
    data: [Comment]
}
`;
