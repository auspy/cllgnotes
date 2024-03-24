"use client";
import { useEffect, useRef } from "react";
import { CustomImageLoader } from "../../loader.config";
import { DocType, ImgProps } from "@cllgnotes/types";
import { atomPdf, throttle } from "@cllgnotes/lib";
// import { useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { default as NextImage } from "next/image";

const PdfImage = ({
  index,
  notPurchased,
  type,
  img,
}: {
  img: ImgProps;
  index: number;
  type?: DocType;
  notPurchased: boolean;
}) => {
  if (notPurchased) {
    // load optimized image for not purchased
    return (
      <NextImage
        className="h-full"
        id={"pdf-image-" + index}
        placeholder="blur"
        blurDataURL="/images/blur.jpg"
        loader={({ width, src }) =>
          CustomImageLoader({
            page: index,
            type: type,
            src,
            width,
            imgType: notPurchased ? "notPurchased" : "purchased",
          })
        }
        style={{
          padding: 2,
          borderRadius: 5,
          objectFit: "contain",
        }}
        {...img}
        src={img.src}
      />
    );
  }
  // const searchParams = useSearchParams();
  const id = "page_" + index;
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // using useRef instead of document.getById as it helps in reducing reloads as we dont have to add in dependency of useEffect
  const [pdfState, setPdfState] = useRecoilState(atomPdf);
  const scale = Number(pdfState.scale) || 0;
  const rotate = Number(pdfState.rotate) || 0;
  // parseInt(searchParams.get("scale") || "") || 0;
  useEffect(() => {
    const createCanvasImage = throttle(() => {
      if (!canvasRef.current) {
        return;
      }

      const url = CustomImageLoader({
        page: index,
        type: type,
        src: img.src,
        imgType: notPurchased ? "notPurchased" : "purchased",
      });

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) {
        console.error("Canvas context is not available");
        return;
      }

      const image = new Image();
      image.src = url;

      // When the image is loaded, draw it on the canvas
      image.onload = () => {
        console.log("Image loaded");
        const canvas = canvasRef.current!;
        const parentDiv = canvas.parentElement;
        if (parentDiv) {
          canvas.width =
            parentDiv.offsetWidth +
            ((scale * 10) / 100) * parentDiv.offsetWidth;
          canvas.height =
            parentDiv.offsetHeight +
            ((scale * 10) / 100) * parentDiv.offsetWidth;
          ctx.resetTransform();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((Math.PI / 180) * rotate);
          ctx.translate(-canvas.width / 2, -canvas.height / 2);
          ctx.drawImage(
            image,
            0,
            0,
            image.width, // size of image recieved
            image.height,
            0,
            0,
            canvas.width, // size of container where it will be placed. automatically scaled based on this
            canvas.height
          );
        }
      };

      // Optional: Handle image loading errors
      image.onerror = () => {
        console.error("Failed to load image:", image.src);
      };
    }, 300);

    createCanvasImage();
    window.addEventListener("resize", createCanvasImage);
    return () => {
      window.removeEventListener("resize", createCanvasImage);
    };
  }, [index, notPurchased, img.src, scale, rotate]);
  const handleScale = (increment: number) => {
    setPdfState((prev) => ({ ...prev, scale: prev.scale + increment }));
  };
  return (
    <canvas
      className={`p-1 ${rotate}`}
      id={id}
      ref={canvasRef}
      style={{ objectFit: "cover", objectPosition: "center" }}
    />
  );
};

export default PdfImage;
