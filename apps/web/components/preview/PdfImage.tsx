"use client";
import { useEffect, useRef } from "react";
import { CustomImageLoader } from "ui";
import { DocType, ImgProps, PdfState } from "@cllgnotes/types";
import { atomPdf, throttle, useCustomCursor } from "@cllgnotes/lib";
// import { useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { default as NextImage } from "next/image";
import AddComment from "./AddComment";
import LoadComments from "./LoadComments";

const PdfImage = ({
  index,
  notPurchased,
  type,
  img,
  projectId,
}: {
  img: ImgProps;
  index: number;
  type?: DocType;
  notPurchased: boolean;
  projectId: string;
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
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const isCommentToolActive = pdfState.editTool === "comment";
  const customCursor = useCustomCursor({
    dependencies: [pdfState.editTool, cursorRef.current, canvasRef.current],
    show: isCommentToolActive,
    container: canvasRef,
    cursorId: cursorRef,
  });
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
        const multiple = (scale * 10 * 3) / 100;
        if (parentDiv) {
          const isRotated = rotate % 180 === 90;
          const parentWidth =
            parentDiv.offsetWidth + multiple * parentDiv.offsetWidth;
          const parentHeight =
            parentDiv.offsetHeight + multiple * parentDiv.offsetHeight;
          // canvas.width =
          //   parentDiv.offsetWidth + multiple * parentDiv.offsetWidth;
          // canvas.height =
          //   parentDiv.offsetHeight + multiple * parentDiv.offsetWidth;
          const aspectRatio = image.width / image.height;
          if (isRotated) {
            canvas.height = parentHeight;
            canvas.width = (parentWidth * 1) / aspectRatio;
          } else {
            canvas.width = parentWidth;
            canvas.height = parentHeight;
          }
          ctx.resetTransform();
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((Math.PI / 180) * rotate);

          ctx.translate(-canvas.width / 2, -canvas.height / 2);
          ctx.drawImage(
            image,
            0,
            0,
            image.width,
            // + ((scale * 10 * 3) / 100) * image.width,
            // size of image recieved
            image.height,
            // + ((scale * 10 * 3) / 100) * image.height,
            0,
            0,
            canvas.width, // size of container where it will be placed. automatically scaled based on this
            canvas.height
          );
          // * example for drawings
          // ctx.fillStyle = "red";
          // const comments = Object.values(pdfState.comments[index] || {});
          // comments.forEach((comment) => {
          //   ctx.fillRect(
          //     comment.x + multiple * comment.x,
          //     comment.y + multiple * comment.y,
          //     20,
          //     20
          //   );
          // });
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
  if (!(typeof index == "number" && index > 0)) {
    console.error("Invalid index");
    return null;
  }
  return (
    <>
      {isCommentToolActive && (
        <div
          ref={cursorRef}
          className="hidden h-[15px]   w-[15px] rounded-ss-full rounded-e-full bg-dark border-[2px] shadow-md border-bg border-solid absolute z-10"
          id="commentCursor"
        ></div>
      )}
      <LoadComments index={index} />
      <AddComment projectId={projectId} index={index} />
      <canvas
        className={`p-1 peer ${rotate} border border-solid border-red`}
        id={id}
        ref={canvasRef}
        style={{
          objectFit: "cover",
          objectPosition: "center",
          cursor: isCommentToolActive ? "none" : "auto",
        }}
      />
    </>
  );
};

export default PdfImage;
