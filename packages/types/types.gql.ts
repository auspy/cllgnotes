export type DocProps = {
  _id: string;
  title: string;
  desc?: string;
  price?: number;
  img: string;
  published: boolean;
  createdAt?: string;
  creator: Creator;
  rating?: string;
  purchaseCount?: string;
  tLikes?: string[];
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
};
