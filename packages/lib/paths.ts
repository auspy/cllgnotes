export const pathDocId = (_id?: string, base: string = "notes") =>
  _id ? `/${base}/` + _id : "";
export const pathExplore = (query: string = "") =>
  `explore${query ? `?${query}` : ""}`;
