import { z } from "zod";
import { Docs } from "../modals/modals.js";
const filterArgs = z.object({
  filter: z.string().default("{}"),
  page: z.number().max(100).default(1),
  pageSize: z.number().max(60).default(35),
});
const getFilterDocs = async (_, args, context) => {
  try {
    console.log("... getting filter docs ...");
    const { page, pageSize, filter } = filterArgs.parse(args);
    console.log("... args recieved =>", page, pageSize, filter);
    // get filter by query
    // eg: will get JSON stringified object: '{"type":{"notes":true}}'
    // const rawFilter = JSON.parse(decodeURIComponent(filter));
    const rawFilter = JSON.parse(filter);
    console.log("... filter recieved =>", rawFilter);
    // convert filter to mongo query
    const query = {};
    for (const key in rawFilter) {
      const value = rawFilter[key];
      query[key] = { $in: Object.keys(value) };
    }
    // get filtered data from db
    // filter docs needed works based on AND + OR. so we will need to manually filter when getting from cache
    // eg; the MongoDB query will find documents where the type is either "paper" or "book" AND the semester is either 1 or 2. so OR in type ,semester own values but AND in type and semester
    const docs = await Docs.find(query)
      .populate("creator", "username _id")
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    console.log("... filtered docs fetched ...");
    console.log(docs);
    return {
      status: "success",
      data: docs,
      msg: "Docs fetched successfully",
    };
    // modify data according to need
  } catch (error) {
    console.log(error, "error in getFilterDocs");
    return { status: "error", error, msg: error.message };
  }
};

export default getFilterDocs;
// check if filter is in cache
// to check in cache, we need to check the filter keys
// if not in cache
// get filtered data from db
// set filtered data in cache
