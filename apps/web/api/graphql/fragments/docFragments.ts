const NotesData = `fragment NotesData on Notes{
    _id
    img
    title
    type
    topics
    subject{
        _id
        name
        code
    }
    course {
        _id
        name
    }
    department{
        _id
        name
    }
    purchaseCount
    isPurchased
    pageCount
    published
    year
    semester
    tLikes
    university{
        _id
    }
}`;
const PaperData = `fragment PaperData on Paper{
    _id
    img
    type
    subject{
        _id
        name
        code
    }
    course {
        _id
        name
    }
    department{
        _id
        name
    }
    purchaseCount
    isPurchased
    published
    pageCount
    year
    semester
    testType
    tLikes
    university{
        _id
    }
}`;
const DocData = `fragment DocData on Doc{
    ...PaperData
    ...NotesData
}`;

export { DocData, NotesData, PaperData };
