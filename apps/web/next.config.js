module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@cllgnotes/types", "ui", "@cllgnotes/lib"],
  webpack: (config) => {
    // const aliasPath = path.resolve(__dirname, "./src"); // Get the resolved alias path

    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   // your aliases
    //   "@": aliasPath,
    // };
    // console.log("Alias path:", aliasPath, config.resolve.alias["@"]);
    // console.log("Import path:", "@/static/parts/box/PartBoxRight");
    config.resolve.fallback = { fs: false, path: false };
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    return config;
  },
  images: {
    domains: ["picsum.photos", "res.cloudinary.com"],
    // loader: "custom",
    // loaderFile: "./loader.config.ts",
  },
};
