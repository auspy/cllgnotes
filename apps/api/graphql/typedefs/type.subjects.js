export const typeSubjects = `
  interface Subjects {
    _id: ID!
    name: String!
    tags: [String]
    elective: Boolean
    category: String
    sem: Int
    code: String
    createdAt: String
    updatedAt: String
  }
  type SubjectPopulated implements Subjects {
    _id: ID!
    name: String!
    tags: [String]
    courseId: Course
    departId: Department
    elective: Boolean
    category: String
    sem: Int
    code: String
    createdAt: String
    updatedAt: String
  }

    type SubjectData implements Subjects {
        _id: ID!
        name: String!
        tags: [String]
        courseId: ID
        departId: ID
        elective: Boolean
        category: String
        sem: Int
        code: String
        createdAt: String
        updatedAt: String
    }
    union Subject = SubjectData | SubjectPopulated
  `;
