"use client";
import { DocType } from "@cllgnotes/types";
import { ImageLoaderProps } from "next/image";

type ImageLoaderPropsWithPage = Omit<ImageLoaderProps, "width"> & {
  page?: number;
  type: DocType;
  width?: number;
};
const CustomImageLoader = ({
  src,
  page = 1,
  type,
}: ImageLoaderPropsWithPage) => {
  if (src.length !== 13) return src;
  // if (img.width && img.width < 1000) {
  //   return `https://res.cloudinary.com/dudgtmj6m/image/upload/pg_${page}/w_${img.width}/f_auto,q_auto:good/v1695147973/pdfs/${src}`;
  // }
  return `https://res.cloudinary.com/dudgtmj6m/image/upload${
    page ? "/pg_" + page : ""
  }/f_auto,q_auto:good/v1695147973/${type || "notes"}/${src}.png`;
};

export { CustomImageLoader };
