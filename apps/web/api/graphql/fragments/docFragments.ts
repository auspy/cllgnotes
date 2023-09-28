const NotesData = `fragment NotesData on Notes{
    _id
    img
    subject
    subjectCode
    course
    department
    purchaseCount
    published
    subject
    subjectCode
    year
    semester
    tLikes
    university
    creator{
        _id
        username
    }
}`;
const PaperData = `fragment PaperData on Paper{
    _id
    img
    subject
    subjectCode
    course
    department
    purchaseCount
    published
    subject
    subjectCode
    year
    semester
    testType
    tLikes
    university
    creator{
        _id
        username
    }
}`;
const DocData = `fragment DocData on Doc{
    ...PaperData
    ...NotesData
}`;

export { DocData, NotesData, PaperData };
