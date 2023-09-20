import { CreateDocs, UpdateDocs } from "./types.gql";

export type FormNewDocProps = { _id?: string } & (
  | (CreateDocs & { type: FormTypeEnum.NEW })
  | (UpdateDocs & { type: FormTypeEnum.UPDATE })
);
export enum FormTypeEnum {
  NEW = 0,
  UPDATE = 1,
}
