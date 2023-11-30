const typeMutation = `#graphql
type Mutation {
    # AUTH
    login(username: ID!, password: String!, role: Role!): authResponse!
    register(user: UserInput!): authResponse!
    logout: authResponse!

    # COURSES
    addDoc(input: CreateDocInput!): docRes!
    updateDoc(input: UpdateDocInput!, id: ID!): docRes!
    purchaseDoc(docId: ID! ,amount: Float! ,payMethod: String!): docRes!
    # deleteDoc(id: ID!): docRes! # this is not needed as on deleting course, users with that course will still have that course in their purchased courses and cant be refunded
}`;

export default typeMutation;
