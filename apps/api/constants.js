const env = process.env.NODE_ENV;
const isDev = env === "development";
const cookieOptions = {
  httpOnly: true, // HttpOnly: if true, the cookie cannot be accessed from within the client-side javascript code.
  // domain: isDev ? "localhost" : "",
  maxAge: 24 * 60 * 60 * 1000 * 7, // 7 days
  sameSite: "Lax",
};
if (!isDev) {
  cookieOptions.secure = true;
}
export { cookieOptions };
