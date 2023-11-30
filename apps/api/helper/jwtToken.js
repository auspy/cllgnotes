import jwt from "jsonwebtoken";
const encryptAccessToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!(user && secret)) return null;
  return jwt.sign({ ...user }, secret, {
    expiresIn: "7d",
  });
};

const decryptAccessTokenMW = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const user = decryptAccessToken(authHeader);
    if (!(user && user.username)) {
      console.log("Error in decryptAccessTokenMW", user, user.username);
      return res.status(403).json({
        error: err?.message || "Missing user in token",
        status: "failed",
      });
    }
    req.user = user;
    next();
  } else {
    res.status(401).json({ error: "Access token not found", status: "failed" });
  }
};

const decryptAccessToken = (accessToken, res) => {
  try {
    if (accessToken) {
      const token = accessToken; // if cookie
      // const token = accessToken.split(" ")[1]; // if header
      return new Promise((resolve) => {
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
          if (err || !data || !data.username) {
            console.log("Error is in decryptAccessToken", data, data?.username);
            return null;
          }
          // if (!data._id) {
          //   if (!res) return null;
          //   const user = await User.findOne({ username: data.username });
          //   if (!user) {
          //     console.log("User not found in database");
          //     return null;
          //   }
          //   data._id = user._id;
          //   const newToken = encryptAccessToken(data);
          //   res.cookie("next-auth.session-token", newToken, cookieOptions);
          //   // const cookie = serialize(
          //   //   "next-auth.session-token",
          //   //   newToken,
          //   //   cookieOptions
          //   // );
          //   // res.setHeader("Set-Cookie", cookie);
          // }
          // console.log("User found in token", data);
          resolve(data);
        });
      });
    }
  } catch (error) {
    console.log("Error in decryptAccessToken", error);
    return null;
  }
};

export { encryptAccessToken, decryptAccessTokenMW, decryptAccessToken };
