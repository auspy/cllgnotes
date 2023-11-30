import { Redis } from "ioredis";
const redisClient = new Redis();
redisClient.on("connect", () => {
  console.log("Redis connected", process.env.PORT);
});
redisClient.on("error", (err) => {
  console.error("Redis error: ", err);
});

export const getRedisItems = async (key, fieldName) => {
  const getKey = (key, fieldName) =>
    !fieldName ? redisClient.get(key) : redisClient.hget(key, fieldName);
  let data = null;
  try {
    data = await getKey(key, fieldName);
    return JSON.parse(data);
  } catch (error) {
    console.log(error, data, "in redisClient getitems");
  }
};
export const setRedisItems = async (key, fieldName, data) => {
  if (!(key && data)) {
    console.log("Key or data not found in setRedisItems");
    return;
  }
  try {
    d;
    await redisClient.hset(key, fieldName, JSON.stringify(data));
    return true;
  } catch (error) {
    console.log(error, "in redisClient setitems");
  }
};
export default redisClient;
