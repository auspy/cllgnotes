const port = 3002;
export const isDev = true;
export const urlGql =
  (isDev ? process.env.NEXT_PUBLIC_API_URL : "") + "/graphql";
