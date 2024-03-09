export const typeCourses = `
interface Courses {
    _id: ID!
    name: String!
    fees: Int
    duration: String
    tags: [String]
    eduType: EduType
    createdAt: String
    updatedAt: String
}
type CoursePopulated implements Courses {
    _id: ID!
    name: String!
    fees: Int
    duration: String
    departId: Department
    subjects: [Subjects]
    tags: [String]
    eduType: EduType
    createdAt: String
    updatedAt: String
}
type CourseData implements Courses {
    _id: ID!
    name: String!
    fees: Int
    duration: String
    departId: ID
    subjects: [ID]
    tags: [String]
    eduType: EduType
    createdAt: String
    updatedAt: String
}
union Course = CourseData | CoursePopulated
`;
