export type DocType = "notes" | "paper";
export const DocTypeArr = ["notes", "paper"];
export const TestTypeArr = ["mst1", "mst2", "endSem"];
export type TestType = "mst1" | "mst2" | "endSem";
interface DocCommon {
  _id: string;
  img: string;
  published: boolean;
  subject: SubjectType;
  type: DocType;
  pageCount?: number;
  createdAt?: string;
  tLikes?: number;
  isPurchased?: boolean;
  rating?: number;
  purchaseCount?: number;
  course?: CourseType;
  department?: DepartmentType;
  semester?: number;
  year?: number;
  university?: UnivType;
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
  university: UnivType;
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
  Autocomplete: DocAutoComplete[];
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

enum EduType {
  UG = "UG",
  PG = "PG",
  PhD = "PhD",
  Diploma = "Diploma",
  Certificate = "Certificate",
  Others = "Other",
}
export type Univ = {
  name: string;
  _id: string;
  tags: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
};
export type Subject = {
  name: string;
  _id: string;
  tags: string[];
  courseId: CourseType;
  departId: DepartmentType;
  sem: number;
  category: string;
  code: string;
  elective: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type Course = {
  name: string;
  fees: number;
  _id: string;
  departId: DepartmentType;
  tags: string[];
  subjects: SubjectType[];
  duration: string;
  eduType: EduType;
  createdAt: Date | string;
  updatedAt: Date | string;
};
export type Department = {
  name: string;
  _id: string;
  tags: string[];
  courses: CourseType[];
};
export type DocQuestions = {
  partA: {
    question: string;
  }[];
  partB: {
    option1: string;
    option2: string;
  }[];
};
export type DocAutoComplete = {
  course: Course;
  department: Department;
  subject: Subject;
  highlights: {
    path: string;
    texts: {
      value: string;
      type: string;
    }[];
  }[];
  _id: string;
  questions: DocQuestions[];
};

export type SubjectType = Subject | string;
export type CourseType = Course | string;
export type DepartmentType = Department | string;
export type UnivType = Univ | string;
