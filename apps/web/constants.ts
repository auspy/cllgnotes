const port = 3002;
export const isDev = process.env.NODE_ENV === "development";
export const urlGql =
  (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002") + "/graphql";
console.log(urlGql);

export const urlSite =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
