// This is the file where our generated types live
// (specified in our `codegen.yml` file)
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];
const resolvers = {
  Query: {
    books: () => books,
  },
};

export default resolvers;
