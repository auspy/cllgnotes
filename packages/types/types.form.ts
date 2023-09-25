import { CreateDocs, UpdateDocs } from "./types.gql";

export type FormNewDocProps = { _id?: string } & (
  | (CreateDocs & { formType: FormTypeEnum.NEW })
  | (UpdateDocs & { formType?: FormTypeEnum.UPDATE })
);
export enum FormTypeEnum {
  NEW = 0,
  UPDATE = 1,
}
