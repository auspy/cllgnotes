const port = 3002;
export const isDev = true;
export const urlGql = isDev
  ? `http://localhost:${port}/graphql`
  : "https://course-selling-eyfo.onrender.com/graphql";
