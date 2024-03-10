export type DocType = "notes" | "paper";
export const DocTypeArr = ["notes", "paper"];
export const TestTypeArr = ["mst1", "mst2", "endSem"];
export type TestType = "mst1" | "mst2" | "endSem";
interface DocCommon {
  _id: string;
  img: string;
  published: boolean;
  subject: string;
  subjectCode: string;
  type: DocType;
  pageCount?: number;
  createdAt?: string;
  tLikes?: number;
  isPurchased?: boolean;
  rating?: number;
  purchaseCount?: number;
  course?: string;
  department?: string;
  semester?: number;
  year?: number;
  university?: string;
  creator?: Creator;
  price?: number;
  __typename?: string;
}
interface Notes extends DocCommon {
  title: string;
  creator: Creator;
  //
  desc?: string;
  topics?: string[];
  units?: string[];
  testType?: undefined;
}

interface Paper extends DocCommon {
  title?: undefined;
  desc?: undefined;
  university: string;
  testType: TestType;
}

export type DocProps = Notes | Paper;

type Creator = {
  _id: string;
  username: string;
  createdCourses: DocProps[];
};
type ResData = {
  data: DocProps[];
  status: string;
  msg: string;
  count?: number;
};
export type DocsQueryProps = {
  getDocs?: ResData;
  getPurchasedDocs?: ResData;
  getCreatedDocs?: ResData;
  getDoc?: ResData;
  purchaseDoc?: ResData;
  getFilteredDocs?: ResData;
};

export type CreateDocs = (
  | (Omit<
      Paper,
      | "rating"
      | "purchaseCount"
      | "tLikes"
      | "_id"
      | "creator"
      | "pageCount"
      | "img"
    > & { type: "paper" })
  | (Omit<
      Notes,
      | "rating"
      | "purchaseCount"
      | "tLikes"
      | "_id"
      | "creator"
      | "pageCount"
      | "img"
    > & { type: "notes" })
) & { img: File };

export type UpdateDocs = Partial<Omit<CreateDocs, "img">> & {
  img?: undefined;
};
