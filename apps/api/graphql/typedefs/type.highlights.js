export const typeHighlights = `
enum textsType{
    hit
    text
}
type Texts {
    value: String
    type: textsType
}
type Highlights {
    path: String
    texts: [Texts]
    score: Float
}`;
