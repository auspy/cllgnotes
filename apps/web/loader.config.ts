// "use client";
// import { ImageLoaderProps } from "next/image";

// type ImageLoaderPropsWithPage = ImageLoaderProps & {
//   page?: number;
// };
// const CustomLoader = ({ src, page = 1 }: ImageLoaderPropsWithPage) => {
//   if (src.split("/")[1]?.length != 13) return src;
//   // if (img.width && img.width < 1000) {
//   //   return `https://res.cloudinary.com/dudgtmj6m/image/upload/pg_${page}/w_${img.width}/f_auto,q_auto:good/v1695147973/pdfs/${src}`;
//   // }
//   return `https://res.cloudinary.com/dudgtmj6m/image/upload${
//     page ? "/pg_" + page : ""
//   }/f_auto,q_auto:good/v1695147973/${src}.png`;
// };

// export default CustomLoader;
