import { CommentType, PdfState } from "@cllgnotes/types";
import { atom } from "recoil";

export const atomPdf = atom<PdfState>({
  key: "pdfState",
  default: {
    scale: 0,
    sort: "page asc",
    search: "",
    rotate: 0,
    fullscreen: false,
    comments: {},
    editTool: null,
    showComments: true,
    activeComment: "",
  },
});
