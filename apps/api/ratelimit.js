import { Ratelimit } from "@upstash/ratelimit";
import { Redis as Rd } from "@upstash/redis";

const cache = new Map();
const ratelimit = new Ratelimit({
  redis: Rd.fromEnv(),
  timeout: 1000,
  analytics: true,
  ephemeralCache: cache,
  limiter: Ratelimit.slidingWindow(80, "60 s"),
});

const checkRateLimit = async (req, res, next) => {
  console.log("Incoming request:", req.method, req.url, req.ip);
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    console.log("dev mode");
    return next();
  }
  if (!ratelimit) {
    console.error("middleware: ratelimit not initialized");
    return next();
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
    ? next()
    : res.json({
        error: "rate limit exceeded",
        status: 429,
        statusText: "Rate imit exceeded",
      });
};

export default checkRateLimit;
