import redisClient from "../../config/redis.config.js";
import { User } from "../modals/modals.js";

const getPurchasedDocs = async (userId) => {
  if (!userId) {
    console.log("No userId provided in pruchasedDocs");
    return;
  }
  // IF NOT IN CACHE, GET FROM DB
  console.log("--- getting new purchased docs ---");
  // GET PURCHASED DOCS FROM DB
  const newDocs = await User.findById(userId).select("purchasedDocs").exec();
  console.log("- got new docs from db -");
  // SET PURCHASED DOCS
  const pDocs = newDocs.purchasedDocs;
  // STORE NEW DOCS IN CACHE
  const pDocsObj = pDocs.reduce(
    (prev, curr) => ({ ...prev, [curr]: true }),
    {}
  );
  console.log(pDocsObj, "object");
  if (Object.keys(pDocsObj).length > 0) {
    redisClient.hmset(userId + ":purchasedDocs", pDocsObj);
    redisClient.expire(userId + ":purchasedDocs", 60 * 60 * 24 * 7); // expires in a week
  }
  console.log("- added new docs in cache -");
  return pDocs;
};
export default getPurchasedDocs;
