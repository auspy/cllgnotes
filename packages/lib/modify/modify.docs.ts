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
    const obj: Partial<CardProps> = {
      ...(rest as any),
      ...commonData,
    };
    if (img) {
      obj["img"] = {
        src: CustomImageLoader({
          src: img,
          type: doc.type || doc.__typename?.toLowerCase(),
          width: 120,
        }),
        alt: commonData?.img?.alt || rest._id,
        width: (commonData?.img ? commonData.img.width : 120) as number,
        height: (commonData?.img ? commonData.img.height : 120) as number,
        fill: commonData?.img?.fill || undefined,
      };
    }
    arr.push(obj);
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
