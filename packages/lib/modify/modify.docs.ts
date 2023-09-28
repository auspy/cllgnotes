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
    const { img, ...rest } = doc;
    // if (
    //   !(course && department && university && title && subject && year && img)
    // ) {
    //   return;
    // }
    arr.push({
      ...rest,
      ...commonData,
      img: {
        src: CustomImageLoader({
          src: img,
          type: doc.type || doc.__typename?.toLowerCase(),
          width: 120,
        }),
        alt: rest._id,
        width: 120,
        height: 120,
        ...(commonData?.img || {}),
      },
    });
  }
  return arr;
};

export const modifyDocsData = (
  docs: DocProps[],
  href: string | false = false
) => {
  return docs.map((doc) => ({
    doc: {
      ...doc,
      img: {
        src: CustomImageLoader({ src: doc.img, type: doc.type, width: 120 }),
        alt: doc.img,
        fill: true,
      },
    },
    href,
  }));
};
