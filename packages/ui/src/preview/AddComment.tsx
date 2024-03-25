"use client";
import { useEffect, useRef, useState } from "react";
import { CustomImageLoader } from "../../loader.config";
import { CommentType, DocType, ImgProps, PdfState } from "@cllgnotes/types";
import { atomPdf, createCommentKey, throttle } from "@cllgnotes/lib";
// import { useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { default as NextImage } from "next/image";

const AddComment = ({ index }: { index: number }) => {
  // COMMENT TOOL CODE
  const [pdfState, setPdfState] = useRecoilState(atomPdf);
  const [canAddComment, setCanAddComment] = useState(false);
  const [commentPos, setCommentPos] = useState<{ x: number; y: number }>();
  const [comment, setComment] = useState<string>("");
  const id = "page_" + index;
  const clearUnwanted = () => {
    // const canvas = document.getElementById(id) as HTMLCanvasElement;
    // const ctx = canvas?.getContext("2d");
    // if (!ctx || !commentPos) {
    //   return;
    // }
    // ctx.clearRect(commentPos.x, commentPos.y, 20, 20);
    setCommentPos(undefined);
  };
  console.log("Comment pos", commentPos);
  const handleCreateComment = () => {
    try {
      if (!commentPos || !comment) {
        console.error("Comment or comment pos not found");
        return;
      }
      const newComment = {
        x: commentPos.x,
        y: commentPos.y,
        text: comment,
        page: index,
        createdAt: new Date(),
      };
      const commentKey = createCommentKey({ comment: newComment });
      if (!commentKey) {
        console.error("Error creating comment key");
        return;
      }
      //   update the state
      setPdfState((prev: PdfState) => {
        return {
          ...prev,
          comments: {
            ...prev.comments,
            [index]: { ...prev.comments[index], [commentKey]: newComment },
          },
        };
      });
      console.log("Comment created", newComment);
      // send the comment to the server
      //   reset the comment
      setCommentPos(undefined);
      setComment("");
    } catch (error) {
      console.error("Error creating comment", error);
    }
  };
  useEffect(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    const handleMousedown = throttle((e: MouseEvent) => {
      if (commentPos) {
        console.log("already active comment");
        return;
      }
      //   const x = e.x;
      //   const y = e.y;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Inverse the transformations
      const rotate = (pdfState.rotate * Math.PI) / 180;

      const x =
        (mouseX - canvas.width / 2) * Math.cos(-rotate) -
        (mouseY - canvas.height / 2) * Math.sin(-rotate) +
        canvas.width / 2;
      const y =
        (mouseX - canvas.width / 2) * Math.sin(-rotate) +
        (mouseY - canvas.height / 2) * Math.cos(-rotate) +
        canvas.height / 2;
      console.log("Mouse down", x, y, e);
      //   const ctx = canvas?.getContext("2d");
      //   if (!ctx) {
      //     return;
      //   }
      //   ctx.fillStyle = "red";
      //   ctx.fillRect(x, y, 20, 20);
      //   setComment({ x: x, y: y, text: "", page: index, createdAt: new Date() });
      setCommentPos({ x, y });

      // send the commnet to the server
    });
    canvas?.addEventListener("mousedown", handleMousedown);
    return () => {
      canvas?.removeEventListener("mousedown", handleMousedown);
    };
  }, [commentPos]);
  if (!commentPos) {
    console.log("No comment pos");
    return null;
  }
  return (
    <div
      style={{
        position: "absolute",
        top: commentPos?.y || 0,
        left: commentPos?.x || 0,
        width: "400px",
        height: "200px",
      }}
      className="bg-blue z-40"
    >
      <form
        id="comment-form"
        className=""
        onSubmit={(e) => {
          handleCreateComment();
          e.preventDefault();
        }}
      >
        <input
          className="border border-solid border-black"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button form="comment-form" type="submit">
          submit
        </button>
      </form>
    </div>
  );
};

export default AddComment;
