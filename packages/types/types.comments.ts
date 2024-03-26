export type CommentType = {
  createdAt: Date;
  page: number;
  text: string;
  x: number;
  y: number;
  updatedAt?: Date;
  user?: string;
  doc?: string;
  _id?: string;
};

export type PdfState = {
  scale: number;
  sort: string;
  search: string;
  rotate: number;
  fullscreen: boolean;
  comments: { [key: number]: { [key: string]: CommentType } };
};

export type CommentRes = {
  data?: CommentType[];
  msg: string;
  status: string;
  error?: any;
};
