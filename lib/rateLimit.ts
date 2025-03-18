import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis,
  // number of requests allowed for a particular duration
  // for example, 5 requests per 1 minutes
  limiter: Ratelimit.fixedWindow(5, "1m"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

export default ratelimit;
// // Use a constant string to limit all requests with a single ratelimit
// // Or use a userID, apiKey or ip address for individual limits.
// const identifier = "api";
// const { success } = await ratelimit.limit(identifier);

// if (!success) {
//   return "Unable to process at this time";
// }
// doExpensiveCalculation();
// return "Here you go!";
