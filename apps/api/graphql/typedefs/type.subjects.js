export const typeSubjects = `
    type Subject {
        _id: ID
        name: String
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
  `;
