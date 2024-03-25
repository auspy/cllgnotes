"use client";

import { atomPdf } from "@cllgnotes/lib";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import CommentFloating from "./CommentFloating";

const LoadComments = ({ index }: { index: number }) => {
  const pdfState = useRecoilValue(atomPdf);
  const comments = pdfState.comments;
  const [active, setActive] = useState("");
  if (typeof index != "number" || index < 0 || !comments[index]) {
    console.error("Invalid index");
    return null;
  }
  console.log("Comments in load", comments[index], index);
  return (
    <>
      {Object.keys(comments[index]).map((commentKey: string, i) => (
        <CommentFloating
          active={active}
          setActive={setActive}
          key={i}
          {...comments[index][commentKey]}
        />
      ))}
    </>
  );
};

export default LoadComments;
