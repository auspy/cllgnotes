"use client";

import { atomPdf } from "@cllgnotes/lib";
import { useRecoilValue } from "recoil";
import RightSidebar from "./RightSidebar";
import { PropsWithChildren } from "react";

const PdfSidebar = ({ children }: PropsWithChildren) => {
  const pdfState = useRecoilValue(atomPdf);
  if (!pdfState.fullscreen) {
    return null;
  }
  return (
    <>
      <RightSidebar>{children}</RightSidebar>
    </>
  );
};

export default PdfSidebar;
