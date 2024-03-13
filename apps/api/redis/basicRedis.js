import redisClient from "../config/redis.config.js";
import { decrypt } from "./EncryptFunctions.js";
import { encrypt } from "./EncryptFunctions.js";

const toSecure = [];

export const redisSet = async (
  enumVal,
  key,
  value,
  expiry = 3600 * 3, // 3hrs default for now
  redis = redisClient
) => {
  try {
    if (!enumVal || !key || !value) return;
    if (
      toSecure.includes(enumVal) &&
      (typeof value == "string" || typeof value == "number")
    ) {
      value = encrypt(value.toString());
    } else value = JSON.stringify(value);
    const id = enumVal + ":" + key;
    console.log("setting data in redisSet", typeof redis);
    await redis.set(id, value);
    await redis.expire(id, expiry);
  } catch (error) {
    console.log(error, "failed setting data in redisSet", enumVal, key);
  }
};

export const redisGet = async (enumVal, key, redis = redisClient) => {
  try {
    if (!key || !enumVal) return;
    const a = await redis.get(enumVal + ":" + key);
    if (!(a && typeof a == "string")) {
      return a;
    }
    if (toSecure.includes(enumVal)) {
      return decrypt(a);
    }
    return JSON.parse(a);
  } catch (error) {
    console.log(error, " error in redisGet", enumVal, key);
  }
};

export const redisGetMany = async (enumVal, keys, redis = redisClient) => {
  const found = [];
  const notFound = [];
  const res = {
    found,
    notFound,
  };
  try {
    if (!Array.isArray(keys) || !enumVal) {
      console.log("missing params in redisGetMany");
      throw new Error("missing params in redisGetMany");
    }
    await Promise.all(
      keys.map(async (key) => {
        const result = await redisGet(enumVal, key, redis);
        if (result) {
          found.push(result);
        } else {
          notFound.push(key);
        }
      })
    );
    console.log("success in redisGetMany");
  } catch (error) {
    console.log(error, " error in redisGetMany", enumVal, keys);
  }
  return res;
};

export const redisSetMany = async (enumVal, keyValuePairs) => {
  try {
    if (!Array.isArray(keyValuePairs) || !enumVal) {
      console.log("missing params in redisSetMany");
      throw new Error("missing params in redisSetMany");
    }
    await Promise.all(
      keyValuePairs.map(async ([key, value]) => {
        await redisSet(enumVal, key, value);
      })
    );
    console.log("success in redisSetMany");
  } catch (error) {
    console.log(error, " error in redisSetMany", enumVal, keyValuePairs);
  }
};
