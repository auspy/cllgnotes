import dotenv from "dotenv";
dotenv.config();
const env = process.env.NODE_ENV || "development";
// const isDev = env === "development";
console.log("ENV", env);
import { getToken } from "next-auth/jwt";
import express from "express";
import { decryptAccessToken } from "./helper/jwtToken.js";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolver.js";
import cookieParser from "cookie-parser";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { v2 as cloudinary } from "cloudinary";
import { connect } from "mongoose";
import checkRateLimit from "./ratelimit.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export { cloudinary };
// SETUP FOR REST AND GRAPHQL

const mongoConnect = connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoCreate: true,
}).then(() => {
  console.log("Mongoose connected to db");
});

console.log("NODE_ENV", process.env.TEST, env);
const app = express();
const port = process.env.PORT || 4000;
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

// PATHS
// to bypass cors error, accept json data
const corsPass = [
  "https://cllgnotes.vercel.app",
  "https://cllgnotes.com",
  "https://www.cllgnotes.com",
];
if (env === "development") {
  corsPass.push("http://localhost:3000");
}
app.use(
  cors({
    origin: corsPass,
    credentials: true,
  }),
  bodyParser.json(),
  cookieParser(),
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 })
);
// Apply middleware
app.use("/graphql", checkRateLimit);
// ATTACHING GRAPHQL MIDDLEWARE TO EXPRESS
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      console.log("--- RECIEVED REQUEST ---");
      // console.log("Request headers", req);
      // Verify and decode JWT token from request headers
      // const token = req.headers.authorization;
      // let token = req.cookies.authToken;
      // if (!token) token = req.cookies["next-auth.session-token"];
      const token = req.cookies["next-auth.session-token"];
      let user = null;
      try {
        if (Boolean(token)) {
          console.log("Token found in request", Boolean(token));
          user = await decryptAccessToken(token, res).catch((err) => {
            console.log("Error in decrypting token", err);
            return null;
          });
        }
        if (user) {
          console.log("User found after decoding", Boolean(user));
          return { user, res };
        }
        // try nextjs token
        console.log("have secret key", Boolean(process.env.NEXTAUTH_SECRET));
        const nexttoken = await getToken({
          req,
        });
        user = nexttoken?.user;
        console.log(
          "User found after decoding nextjs",
          Boolean(user),
          nexttoken
        );
        return { user, res };
      } catch (error) {
        // Handle token verification errors, if any
        console.error("Token verification error:", error);
        return null;
      }
    },
  })
);

app.get("/health", (req, res) => {
  console.log("Health check");
  res.send("Server is running");
});

await new Promise((resolve) => {
  console.log("🚀 Building server at", port);
  return httpServer.listen({ port }, resolve);
});
console.log(`🚀 Server ready at ${port}`);
