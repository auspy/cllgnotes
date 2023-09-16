import { CreateDocs, UpdateDocs } from "./types.gql";

export type FormNewDocProps =
  | (CreateDocs & { type: FormTypeEnum.NEW })
  | UpdateDocs;
export enum FormTypeEnum {
  NEW = 0,
  UPDATE = 1,
}
