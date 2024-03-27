"use client";
import { createCommentKey, UseOutsideClick } from "@cllgnotes/lib";
import { CommentType } from "@cllgnotes/types";
import { useEffect, useState } from "react";
import { Text } from "ui";

const CommentFloating = ({
  text,
  x,
  y,
  active,
  setActive,
  page,
}: CommentType & {
  active?: string;
  setActive: (id: string) => void;
}) => {
  const key = createCommentKey({ x, y, page });
  const pdfId = "page_" + page;
  const [calcX, setX] = useState(x || 0);
  const [calcY, setY] = useState(y || 0);
  useEffect(() => {
    const pdfPage = document.getElementById(pdfId);
    console.log("PdfPage", pdfPage);
    const handleResize = () => {
      if (!pdfPage) {
        console.error("PdfPage not found");
        return;
      }
      console.log("Resize", pdfPage.clientWidth);
      // 100% should be at 813 and above
      const scale = pdfPage.clientWidth >= 950 ? 1 : pdfPage.clientWidth / 950;
      const x1 = x * scale;
      const y1 = y * scale;
      setX(x1);
      setY(y1);
      console.log("Resize", x1, y1);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pdfId, x, y]);
  const isActive = active === key;
  if (!isActive) {
    return (
      <button
        style={{
          top: calcY,
          left: calcX,
        }}
        className="p-2 absolute hover:!opacity-100 rounded-full"
        onClick={() => {
          if (!key) {
            console.error("Error creating comment key");
            return;
          }
          setActive(key);
        }}
      >
        <div
          style={{
            boxShadow: "1px 1px 0px 0px #141414",
          }}
          className="group h-[20px] hover:h-auto hover:max-h-[300px] box-border hover:box-content scrollbar-hide hover:p-4 hover:w-[200px] hover:transition-[width]  w-[20px] rounded-full hover:rounded-[5px] bg-lYellow border shadow-md hover:z-30 border-dark border-solid  z-20"
        >
          <Text type="medi14" textClass="text-left group-hover:block hidden">
            {text}
          </Text>
        </div>
      </button>
    );
  }
  return (
    <div
      style={{
        position: "absolute",
        top: calcY,
        left: calcX,
      }}
      className="z-30 max-w-[200px] max-h-[300px] overflow-y-scroll scrollbar-hide bg-white p-2 border border-dark border-solid  shadow-lg rounded-[5px]"
    >
      {isActive && (
        <UseOutsideClick
          setShow={() => {
            setActive("");
          }}
        />
      )}
      <Text type="medi14" textClass="text-left">
        {text}
      </Text>
    </div>
  );
};

export default CommentFloating;
