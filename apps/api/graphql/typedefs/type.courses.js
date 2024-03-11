export const typeCourses = `
type Course {
    _id: ID
    name: String
    fees: Int
    duration: String
    departId: Department
    subjects: [Subject]
    tags: [String]
    eduType: EduType
    createdAt: String
    updatedAt: String
}
`;
