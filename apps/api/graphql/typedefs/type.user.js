const typeUser = `#user related types
enum Role{
    ADMIN
    USER
}
input UserInput{
    username:ID!
    password:String!
    role: Role!
    email:String!
}
type User{
    id: ID!
    username:ID!
    password:String
    role: Role!
    email:String!
    purchasedDocs:[ID]
    createdDocs:[ID]
}
#// // can be used later
# interface UserInterface{
#     id: ID!
#     username:ID!
#     password:String
#     role: Role!
#     email:String!
# }
# type User extends UserInterface{
#     id: ID!
#     username:ID!
#     password:String
#     role: Role!
#     email:String!
#     purchasedDocs:[ID]
# }
# type Admin extends UserInterface{
#     id: ID!
#     username:ID!
#     password:String
#     role: Role!
#     email:String!
#     createdDocs:[ID]
# }
`;
export default typeUser;
