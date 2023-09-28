import { DocType } from "./types.gql";
import { ImgProps } from "./types.img";

export type PreviewPdfProps = {
  img: ImgProps;
  notPurchased: boolean;
  type: DocType;
  totalPages: number;
  price: number;
  _id: string;
};
