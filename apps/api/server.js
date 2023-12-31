import dotenv from "dotenv";
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export { cloudinary };
// SETUP FOR REST AND GRAPHQL

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
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
  bodyParser.json(),
  cookieParser(),
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 })
);

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
      // console.log("Token found in request", token);

      const token = req.cookies["next-auth.session-token"];
      try {
        if (!token) return { res };
        const user = await decryptAccessToken(token, res);
        console.log("User found after decoding", user);
        return { user, res };
      } catch (error) {
        // Handle token verification errors, if any
        console.error("Token verification error:", error);
        return null;
      }
    },
  })
);

await new Promise((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at ${port}`);
