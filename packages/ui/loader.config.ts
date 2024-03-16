import { DocType } from "@cllgnotes/types";
import { ImageLoaderProps } from "next/image";
const types = {
  normal: "t_normal",
  thumbnail: "t_thumb",
  notPurchased: "t_preview_sml",
  purchased: "t_copyright",
};
type ImageLoaderPropsWithPage = Omit<ImageLoaderProps, "width"> & {
  page?: number;
  type?: DocType;
  width?: number;
  isThumbnail?: boolean;
  imgType?: keyof typeof types;
};
const CustomImageLoader = ({
  src,
  page = 1,
  type = "paper",
  imgType = "thumbnail",
}: ImageLoaderPropsWithPage) => {
  // console.log("src", src, type);
  if (src?.length !== 13) return src;
  // if (img.width && img.width < 1000) {
  //   return `https://res.cloudinary.com/dudgtmj6m/image/upload/pg_${page}/w_${img.width}/f_auto,q_auto:good/v1695147973/pdfs/${src}`;
  // }
  if (page > 2 || imgType === "purchased") {
    return `https://res.cloudinary.com/dudgtmj6m/image/upload/t_copyright${
      page > 1 ? "_" + page : ""
    }/v1695147973/${type}/${src}.png`;
  }
  return `https://res.cloudinary.com/dudgtmj6m/image/upload/${types[imgType]}/v1695147973/${type}/${src}.png`;
};

export { CustomImageLoader };

// https://res.cloudinary.com/dudgtmj6m/image/upload/c_thumb,w_200,g_face/v1710260004/paper/1710259927683.pdf
