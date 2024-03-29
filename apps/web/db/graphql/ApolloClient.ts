import { urlGql } from "@/constants";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { cacheOptions } from "./cache.config";
// import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(cacheOptions),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: urlGql,
      credentials: "include",
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      fetchOptions: { cache: "no-store" },
    }),
    // createUploadLink({
    //   uri: urlGql,
    //   credentials: "include",
    //   fetchOptions: { cache: "no-store" },
    // }),
  });
});
