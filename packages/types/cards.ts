export enum CardFontSize {
    small = 12,
    medium = 22,
}
export enum CardFontWeight{
    small = 500,
    large = 600
}
export type CardProps = {
    imgSrc: string;
    imgAlt: string;
    cource: string;
    degree: string;
    semester: number;
    subject: string;
    chapter: string;
}
