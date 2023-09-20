export type DocType = "notes" | "paper" | "presentation";
export type DocProps = {
  _id: string;
  title: string;
  desc?: string;
  price?: number;
  img: string;
  pageCount: number;
  type: DocType;
  published: boolean;
  createdAt?: string;
  creator: Creator;
  rating?: string;
  purchaseCount?: string;
  tLikes?: string[];
  // university related
  course?: string;
  department?: string;
  year?: number;
  university?: string;
  topic?: string[];
  subject: string;
  subjectCode: string;
  chapters?: string[];
};
type Creator = {
  _id: string;
  username: string;
  createdCourses: DocProps[];
};
type ResData = {
  data: DocProps[];
  status: string;
  msg: string;
};
export type DocsQueryProps = {
  getDocs?: ResData;
  getPurchasedDocs?: ResData;
  getCreatedDocs?: ResData;
  getDoc?: ResData;
  purchaseDoc?: ResData;
};

export type CreateDocs = Omit<
  DocProps,
  "rating" | "purchaseCount" | "tLikes" | "_id" | "creator" | "pageCount"
>;
export type UpdateDocs = Partial<Omit<CreateDocs, "img">>;
