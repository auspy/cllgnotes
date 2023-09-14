import { CardProps, DocProps } from "@cllgnotes/types";

export const modifyToCardsData = (
  data: DocProps[] | undefined,
  commonData?: Partial<CardProps>
): Partial<CardProps>[] | undefined => {
  const arr: Partial<CardProps>[] = [];
  if (!data) {
    return;
  }
  for (const doc of data) {
    const { course, department, university, title, subject, year, img, _id } =
      doc;
    // if (
    //   !(course && department && university && title && subject && year && img)
    // ) {
    //   return;
    // }
    arr.push({
      img: { src: img, alt: title, fill: true },
      course: course,
      department: department,
      univ: university,
      topic: title,
      subject: subject,
      year: year,
      _id: _id,
      ...commonData,
    });
  }
  return arr;
};
