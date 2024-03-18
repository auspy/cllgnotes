import { z } from "zod";
import { Docs } from "../modals/modals.js";
import mongoose from "mongoose";
const filterArgs = z.object({
  filter: z.string().optional().nullable(),
  page: z.number().max(100).default(1),
  pageSize: z.number().max(60).default(35),
  search: z.string().optional().nullable(),
});

// ? for now using both lookup and populate. will later remove based on research.
const getFilterDocs = async (parent, args, context, someData) => {
  try {
    console.log("... getting filter docs ...", args);
    const { page, pageSize, filter, search } = filterArgs.parse(args);
    console.log(
      "... args recieved =>",
      page,
      pageSize,
      filter,
      search,
      someData.fieldName
    );
    if (someData?.fieldName?.toLowerCase() == "autocomplete") {
      console.log("... page is 0, returning empty array ...");
      // run auto complete search
      // create a filter based search
      const autocompletePipeline = [
        {
          $search: {
            index: "searchDocs",
            compound: {
              should: [
                {
                  autocomplete: {
                    query: "btech",
                    path: "course.name",
                    fuzzy: {
                      maxEdits: 1,
                      prefixLength: 1,
                      // maxExpansions: 256,
                    },
                  },
                },
                {
                  autocomplete: {
                    query: "btech",
                    path: "department.name",
                    fuzzy: {
                      maxEdits: 1,
                      prefixLength: 1,
                      // maxExpansions: 256,
                    },
                  },
                },
                {
                  autocomplete: {
                    query: "math",
                    path: "subject.name",
                    fuzzy: {
                      maxEdits: 1,
                      prefixLength: 1,
                      // maxExpansions: 256,
                    },
                  },
                },
                {
                  autocomplete: {
                    query: "btech",
                    path: "questions.partA.question",
                    fuzzy: {
                      maxEdits: 1,
                      prefixLength: 1,
                      // maxExpansions: 256,
                    },
                  },
                },
                {
                  autocomplete: {
                    query: "btech",
                    path: "questions.partB.option1",
                    fuzzy: {
                      maxEdits: 1,
                      prefixLength: 1,
                      // maxExpansions: 256,
                    },
                  },
                },
                {
                  autocomplete: {
                    query: "btech",
                    path: "questions.partB.option2",
                    fuzzy: {
                      maxEdits: 1,
                      prefixLength: 1,
                      // maxExpansions: 256,
                    },
                  },
                },
              ],
            },
            highlight: {
              path: [
                "course.name",
                "department.name",
                "subject.name",
                "questions.partA.question",
                "questions.partB.option1",
                "questions.partB.option2",
              ],
              maxCharsToExamine: 1000,
            },
          },
        },
        {
          $project: {
            course: 1,
            department: 1,
            subject: 1,
            testType: 1,
            questions: 1,
            _id: 1,
            year: 1,
            semester: 1,
            highlights: {
              $meta: "searchHighlights",
            },
          },
        },
        {
          $limit: 5,
        },
      ];

      const autocomplete = await mongoose.connection.db
        .collection("searchDocs")
        .aggregate(autocompletePipeline, {
          maxTimeMS: 60000,
          allowDiskUse: true,
        })
        .toArray((err, results) => {
          if (err) {
            console.error("Error fetching autocomplete data:", err);
            return [];
          }
          console.log("Autocomplete results:", results);
          // Handle the autocomplete results here
          return results;
        });
      console.log("... autocomplete pipeline =>", autocomplete);
      return autocomplete;
    }
    const isTrending = search == "trending";
    const baseQuery = (qry) =>
      Docs.find(qry)
        .populate("course", "name _id")
        .populate("subject", "code name _id")
        .populate("department", "name _id");
    if (isTrending) {
      console.log("... fetching trending docs ...");
      const trendingDocs = await baseQuery({})
        .sort({ tLikes: -1, purchaseCount: -1 })
        .limit(10)
        .lean();
      console.log("... trending docs fetched ...", trendingDocs.length);
      return {
        status: "success",
        data: trendingDocs,
        msg: "Trending Docs fetched successfully",
        count: trendingDocs.length,
      };
    }
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
    console.log("... query after adding filters =>", query);
    let regexQuery = null;
    const orQuery = [];
    if (search) {
      const pattern = new RegExp(search.split(" ").join("|"), "i");
      console.log("... pattern =>", pattern);
      regexQuery = { $regex: pattern };
      Array.prototype.push.apply(orQuery, [
        { "questions.partA.question": regexQuery },
        { "questions.partB.question": regexQuery },
        { "questions.partA.option1": regexQuery },
        { "questions.partA.option2": regexQuery },
        { "questions.partB.option1": regexQuery },
        { "questions.partB.option2": regexQuery },
        { title: regexQuery },
      ]);
    }
    const skipVal = (page - 1) * pageSize;
    const simpleQuery = baseQuery(query)
      .skip(skipVal)
      .sort({ tLikes: -1, createdAt: -1 })
      .limit(pageSize)
      .lean();

    const aggregatePipeline = [];

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
            ...orQuery,
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
