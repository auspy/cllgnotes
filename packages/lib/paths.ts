export const pathDocId = (_id?: string, base: string = "notes") =>
  _id ? `${base}/` + _id : "";
