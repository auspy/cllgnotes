const port = 3002;
export const isDev = process.env.NODE_ENV === "development";
export const urlGql =
  (isDev ? process.env.NEXT_PUBLIC_API_URL : "") + "/graphql";
