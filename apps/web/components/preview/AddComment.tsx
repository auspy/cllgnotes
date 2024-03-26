"use client";
import { useEffect, useRef, useState } from "react";
import { Button, ButtonBlack, CustomImageLoader } from "ui";
import { CommentType, DocType, ImgProps, PdfState } from "@cllgnotes/types";
import { atomPdf, atomToast, createCommentKey, throttle } from "@cllgnotes/lib";
// import { useSearchParams } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { default as NextImage } from "next/image";
import useAddComment from "@/db/useAddComment";
import { useSession } from "next-auth/react";
// @ts-ignore
import { zodCommentInput } from "@cllgnotes/zod";
import { Close } from "@mui/icons-material";

const AddComment = ({
  index,
  projectId,
}: {
  index: number;
  projectId: string;
}) => {
  // COMMENT TOOL CODE
  const [pdfState, setPdfState] = useRecoilState(atomPdf);
  const canAddComment = pdfState.editTool === "comment";
  const [commentPos, setCommentPos] = useState<{ x: number; y: number }>();
  const [comment, setComment] = useState<string>("");
  const { addComment, error } = useAddComment();
  const divRef = useRef<HTMLDivElement | null>(null);

  const setToast = useSetRecoilState(atomToast);
  const session: any = useSession();
  const userId = session.data?.user?._id;

  const id = "page_" + index;
  const clearUnwanted = () => {
    // const canvas = document.getElementById(id) as HTMLCanvasElement;
    // const ctx = canvas?.getContext("2d");
    // if (!ctx || !commentPos) {
    //   return;
    // }
    // ctx.clearRect(commentPos.x, commentPos.y, 20, 20);
    // setPdfState((prev: PdfState) => ({ ...prev, editTool: null }));
    setCommentPos(undefined);
  };

  console.log("Comment pos", commentPos);
  const handleCreateComment = async () => {
    let commentKey: string | null = null;
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
      commentKey = createCommentKey({ comment: newComment });
      if (!commentKey || commentKey == null) {
        console.error("Error creating comment key");
        return;
      }
      //   update the state
      setPdfState((prev: PdfState) => {
        return {
          ...prev,
          comments: {
            ...prev.comments,
            [index]: {
              ...prev.comments[index],
              [commentKey as string]: newComment,
            },
          },
        };
      });
      console.log("Comment created", newComment);
      //   reset the comment
      setCommentPos(undefined);
      setComment("");
      // send the comment to the server
      const data = zodCommentInput.parse({
        ...newComment,
        doc: projectId,
        user: userId,
      });
      console.log("Data for addComment", data);
      const res = await addComment(data);
      if (!res || res.errors || error) {
        console.error("Error creating comment in backend", error, res.errors);
        throw new Error("Error creating comment");
      }
      console.log("Comment created", res);
    } catch (error) {
      console.error("Error creating comment", error);
      // remove the comment from the state
      setPdfState((prev: PdfState) => {
        const newComments = { ...prev.comments[index] };
        if (commentKey != null) {
          delete newComments[commentKey];
        }
        return {
          ...prev,
          comments: { ...prev.comments, [index]: newComments },
        };
      });
      setToast({
        text: "Error creating comment, Try again",
        type: "error",
        secs: 5000,
      });
      return;
    }
  };
  useEffect(() => {
    if (!canAddComment) {
      return;
    }
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
  }, [commentPos, canAddComment]);
  if (!commentPos || !canAddComment) {
    console.log("cant add comment");
    return null;
  }
  return (
    <div
      ref={divRef}
      style={{
        position: "absolute",
        top: commentPos?.y || 0,
        left: commentPos?.x || 0,
        // width: "400px",
        // height: "200px",
      }}
      className=" z-40"
    >
      <button
        onClick={clearUnwanted}
        className="p-2 rounded-ss-full rounded-e-full "
      >
        <div className=" h-[25px] fccc  w-[25px] rounded-ss-full rounded-e-full bg-dark border-[2px] shadow-md border-bg border-solid z-10">
          <Close
            style={{
              height: 12,
              width: 12,
              color: "white",
            }}
          />
        </div>
      </button>
      <form
        id="comment-form"
        className="relative flex flex-col gap-2 top-0 left-4 bg-bg p-2 border border-dark border-solid z-10 shadow-lg rounded-[5px]"
        onSubmit={(e) => {
          handleCreateComment();
          e.preventDefault();
        }}
      >
        <textarea
          className="border max-h-[300px] priBtn p-2 text-sm font-medium shadow-box1 border-solid border-black"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <ButtonBlack
          buttonStyles={{
            padding: 7,
            height: "auto",
            width: "100%",
            borderRadius: 5,
          }}
          fontSize={14}
          type="submit"
          form="comment-form"
          text="submit"
        />
      </form>
    </div>
  );
};

export default AddComment;
