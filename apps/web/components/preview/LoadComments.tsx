"use client";

import { atomPdf } from "@cllgnotes/lib";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import CommentFloating from "./CommentFloating";

const LoadComments = ({ index }: { index: number }) => {
  const [pdfState, setPdfState] = useRecoilState(atomPdf);
  const comments = pdfState.comments;
  const activeComment = pdfState.activeComment;
  const handleActiveComment = (id: string) => {
    setPdfState((prev) => ({ ...prev, activeComment: id }));
  };
  const showComments = pdfState.showComments;
  if (
    typeof index != "number" ||
    index < 0 ||
    !comments[index] ||
    !showComments
  ) {
    // console.error("Invalid index");
    return null;
  }
  console.log("Comments in load", comments[index], index);
  return (
    <>
      {Object.keys(comments[index]).map((commentKey: string, i) => (
        <CommentFloating
          active={activeComment}
          setActive={handleActiveComment}
          key={i}
          {...comments[index][commentKey]}
        />
      ))}
    </>
  );
};

export default LoadComments;
