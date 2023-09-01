import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import resolvers from "./resolvers/resolver.js";
import typeDefs from "./typedefs/typedefs.js";
import { logger } from "logger";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

logger.info(`🚀  Server ready at: ${url}`);
console.log(`🚀  Server ready at: ${url}`);
