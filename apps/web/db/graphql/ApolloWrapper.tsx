"use client";
import { urlGql } from "@/constants";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
// import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { cacheOptions } from "./cache.config";

// // FOR HEADER AUTH
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  if (typeof window !== "undefined" && window.localStorage) {
    const token = localStorage.getItem("authToken");
    // console.log("token sads", token);
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : "",
        "x-apollo-operation-name": "wow",
      },
    };
  }
  return {
    headers: {
      ...headers,
      "x-apollo-operation-name": "wow",
    },
  };
});

// have a function to create a client for you
function makeClient() {
  const httpLink = authLink.concat(
    new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: urlGql,
      credentials: "include",
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    })
  );
  // createUploadLink({
  //   uri: urlGql,
  //   credentials: "include",
  //   fetchOptions: {
  //     cache: "no-store",
  //   },
  // })

  return new NextSSRApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new NextSSRInMemoryCache(cacheOptions),
    connectToDevTools: true,
    // credentials: "include",
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
