export const typeAutocomplete = `
type Autocomplete {
    _id: ID
    course: Course
    year: Int
    semester: Int
    testType: TestType
    department: Department
    subject: Subject
    questions: Questions
    highlights: [Highlights]!
}`;
