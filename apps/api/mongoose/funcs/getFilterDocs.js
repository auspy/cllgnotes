import { z } from "zod";
import { Docs } from "../modals/modals.js";
const filterArgs = z.object({
  filter: z.string().optional().nullable(),
  page: z.number().max(100).default(1),
  pageSize: z.number().max(60).default(35),
  search: z.string().optional().nullable(),
});

// ? for now using both lookup and populate. will later remove based on research.
const getFilterDocs = async (parent, args, context) => {
  try {
    console.log("... getting filter docs ...", args);
    const { page, pageSize, filter, search } = filterArgs.parse(args);
    console.log("... args recieved =>", page, pageSize, filter, search);
    // get filter by query
    // eg: will get JSON stringified object: '{"type":{"notes":true}}'
    // const rawFilter = JSON.parse(decodeURIComponent(filter));
    // const rawFilter = { type: { notes: true } };
    const rawFilter = filter && JSON.parse(filter);
    console.log("... filter recieved =>", rawFilter);
    // convert filter to mongo query
    const query = {};
    if (rawFilter) {
      for (const key in rawFilter) {
        if (key == "search") {
          continue;
        }
        const value = rawFilter[key];
        query[key] = { $in: Object.keys(value) };
      }
    }
    let regexQuery = null;
    if (search) {
      const pattern = new RegExp(search.split(" ").join("|"), "i");
      console.log("... pattern =>", pattern);
      regexQuery = { $regex: pattern };
      query["$or"] = [
        { "questions.partA.question": regexQuery },
        { "questions.partB.question": regexQuery },
        { "questions.partA.option1": regexQuery },
        { "questions.partA.option2": regexQuery },
        { "questions.partB.option1": regexQuery },
        { "questions.partB.option2": regexQuery },
        { title: regexQuery },
      ];
    }
    // get filtered data from db
    // filter docs needed works based on AND + OR. so we will need to manually filter when getting from cache
    // eg; the MongoDB query will find documents where the type is either "paper" or "book" AND the semester is either 1 or 2. so OR in type ,semester own values but AND in type and semester
    // console.log("searching using query =>", query, JSON.stringify(query.$or));
    const skipVal = (page - 1) * pageSize;
    const simpleQuery = Docs.find(query)
      .populate("course", "name _id")
      .populate("subject", "code name _id")
      .populate("department", "name _id")
      // .populate("creator", "username _id")
      .skip(skipVal)
      .limit(pageSize)
      .lean();

    const aggregatePipeline = [];
    if (search) {
      aggregatePipeline.push({
        $match: query,
      });
    }
    aggregatePipeline.push(
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course",
        },
      },
      {
        $lookup: {
          from: "subjects",
          localField: "subject",
          foreignField: "_id",
          as: "subject",
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "_id",
          as: "department",
        },
      }
    );
    if (search) {
      aggregatePipeline.push({
        $match: {
          $or: [
            {
              "course.name": regexQuery,
            },
            {
              "department.name": regexQuery,
            },
          ],
        },
      });
    }
    aggregatePipeline.push({ $skip: skipVal }, { $limit: pageSize });
    // console.log("aggregate pipeline =>", aggregatePipeline);
    const aggregateQuery = Docs.aggregate(aggregatePipeline, {
      maxTimeMS: 60000,
      allowDiskUse: true,
    });
    const docsQuery = search ? aggregateQuery : simpleQuery;

    let [count, docs] = await Promise.all([
      Docs.countDocuments(query),
      docsQuery,
    ]);

    console.log("... filtered docs fetched ...");
    console.log(docs.length, "docs fetched from", count, "docs in total");
    if (search) {
      docs = docs.map((doc) => {
        // unwrap populated fields
        doc.course = doc.course?.[0];
        doc.subject = doc.subject?.[0];
        doc.department = doc.department?.[0];
        return doc;
      });
    }
    return {
      status: "success",
      data: docs,
      msg: "Docs fetched successfully",
      count: search ? docs.length : count,
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
