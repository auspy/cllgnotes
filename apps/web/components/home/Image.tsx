"use client";
import { ImgProps } from "@cllgnotes/types";
import Image from "next/image";

const ImageClient = (props: { img: ImgProps }) => {
  return <Image className="frc" {...props.img} />;
};

export default ImageClient;
