import { atom } from "recoil";

export const atomPdf = atom({
  key: "pdfState",
  default: {
    scale: 0,
    sort: "page asc",
    search: "",
    rotate: 0,
  },
});
