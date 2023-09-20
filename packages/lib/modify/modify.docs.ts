import { CardProps, DocProps } from "@cllgnotes/types";
import { CustomImageLoader } from "ui";

export const modifyToCardsData = (
  data: DocProps[] | undefined,
  commonData?: Partial<CardProps>
): Partial<CardProps>[] | undefined => {
  const arr: Partial<CardProps>[] = [];
  if (!data) {
    return;
  }
  for (const doc of data) {
    const {
      course,
      department,
      university,
      title,
      subject,
      year,
      img,
      _id,
      ...rest
    } = doc;
    // if (
    //   !(course && department && university && title && subject && year && img)
    // ) {
    //   return;
    // }
    arr.push({
      course: course,
      department: department,
      univ: university,
      subject: subject,
      year: year,
      _id: _id,
      ...rest,
      topic: title,
      ...commonData,
      img: {
        src: CustomImageLoader({ src: img, type: doc.type, width: 120 }),
        alt: title,
        width: 120,
        height: 120,
        ...(commonData?.img || {}),
      },
    });
  }
  return arr;
};

export const modifyCoursesData = (
  docs: DocProps[],
  href: string | false = false
) => {
  return docs.map((doc) => ({
    doc: {
      ...doc,
      img: {
        src: CustomImageLoader({ src: doc.img, type: doc.type, width: 120 }),
        alt: doc.title,
        fill: true,
      },
    },
    href,
  }));
};
