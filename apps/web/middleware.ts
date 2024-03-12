import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis as Rd } from "@upstash/redis";
import { isDev } from "./constants";

// middleware is applied to all routes, use conditionals to select
const cache = new Map();
const ratelimit =
  !isDev &&
  new Ratelimit({
    redis: Rd.fromEnv(),
    timeout: 1000,
    analytics: true,
    ephemeralCache: cache,
    limiter: Ratelimit.slidingWindow(80, "60 s"),
  });
export default withAuth(
  async function middleware(req) {
    // return NextResponse.next();
    console.log("Incoming request:", req.method, req.url, req.ip);
    if (isDev) {
      console.log("dev mode");
      return NextResponse.next();
    }
    if (!ratelimit) {
      console.error("middleware: ratelimit not initialized");
      return NextResponse.next();
    }
    const ip = req.ip ?? "127.0.0.1";
    const { success, pending, limit, reset, remaining } =
      await ratelimit.limit(ip);
    console.log(
      "ratelimit: within limit?",
      success,
      await pending,
      limit,
      reset,
      remaining
    );
    return success
      ? NextResponse.next()
      : NextResponse.json(
          { error: "rate limit exceeded" },
          { status: 429, statusText: "Rate imit exceeded" }
        );
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // console.log(
        //   "authorized",
        //   req.nextUrl.pathname,
        //   token,
        // );
        const jwtToken = req.cookies.get("authToken");
        const nextSession = req.cookies.get("next-auth.session-token");
        // console.log(
        //   "nextSession",
        //   nextSession,
        //   jwtToken,
        //   req.nextUrl.pathname
        // );
        if (
          req.nextUrl.pathname.startsWith("/dashboard") &&
          !(jwtToken || nextSession)
        ) {
          return false;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
