import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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

// SETUP FOR REST AND GRAPHQL
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });
console.log("NODE_ENV", process.env.ENV, env);
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
  cookieParser()
);

// ATTACHING GRAPHQL MIDDLEWARE TO EXPRESS
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      // console.log("Request headers", req.body);
      // Verify and decode JWT token from request headers
      const token = req.headers.authorization;
      // console.log("Token found in request", token);
      try {
        if (!token) return { res };
        const user = decryptAccessToken(token);
        console.log("User found in token", user);
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

// MONGOOSE
const { connect, connection: conn } = mongoose;
const mongoUrl = process.env.MONGO_URI;
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoCreate: true,
});

conn.once("open", (_) => {
  console.log("Database connected");
});

conn.on("error", (err) => {
  console.error("connection error:", err);
});
