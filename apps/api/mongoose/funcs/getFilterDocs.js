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
    const skipVal = (page - 1) * pageSize;

    // * TRENDING DOCS
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

    // PARSING FILTERS
    const rawFilter = filter && JSON.parse(filter);
    console.log("... filter recieved =>", rawFilter);
    // ADDING FILTERS TO QUERY
    const query = {};
    const searchFilterQuery = [];
    if (rawFilter) {
      for (const key in rawFilter) {
        if (key == "search") {
          continue;
        }
        const value = rawFilter[key];
        query[key] = { $in: Object.keys(value) };
        // can convert values to required types here by checking the keys
        const numberFields = new Set(["semester", "year"]);
        let convertedValue = Object.keys(value);
        if (numberFields.has(key)) {
          convertedValue = convertedValue.map((item) => parseInt(item));
        }
        searchFilterQuery.push({
          in: { path: key, value: convertedValue },
        });
      }
    }
    console.log("... query after adding filters =>", query);
    const compoundQuery = {};
    if (searchFilterQuery.length > 0 && filter) {
      compoundQuery["must"] = searchFilterQuery;
    }
    // * AUTOCOMPLETE SEARCH BAR
    if (someData?.fieldName?.toLowerCase() == "autocomplete") {
      if (!search) {
        return {
          status: "error",
          msg: "Search query is required for autocomplete",
        };
      }
      console.log("... running search autocomplete ...");
      // run auto complete search
      // create a filter based search
      compoundQuery["should"] = [
        {
          autocomplete: {
            query: search,
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
            query: search,
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
            query: search,
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
            query: search,
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
            query: search,
            path: "questions.partB.option2",
            fuzzy: {
              maxEdits: 1,
              prefixLength: 1,
              // maxExpansions: 256,
            },
          },
        },
      ];
      // // can add filters here
      // if (filter) {

      // }
      const autocompletePipeline = [
        {
          $search: {
            index: "searchDocs",
            compound: compoundQuery,
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

    if (search) {
      // * SEARCH DOCS
      compoundQuery["should"] = [
        {
          text: {
            query: search,
            path: ["course.name", "department.name", "subject.name"],
            fuzzy: {
              prefixLength: 1,
            },
          },
        },
        {
          text: {
            query: search,
            path: {
              wildcard: "questions.part*",
            },
            fuzzy: {
              maxEdits: 1,
              prefixLength: 1,
            },
          },
        },
      ];
      const searchPipeline = [
        {
          $search: {
            index: "searchDocs",
            compound: compoundQuery,
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
            highlights: {
              $meta: "searchHighlights",
            },
            _id: 1,
            course: 1,
            department: 1,
            subject: 1,
            questions: 1,
            year: 1,
            semester: 1,
            questions: 1,
            testType: 1,
            type: 1,
            img: 1,
          },
        },
        {
          $skip: skipVal,
        },
        {
          $limit: pageSize,
        },
      ];

      const searchedDocs = await mongoose.connection.db
        .collection("searchDocs")
        .aggregate(searchPipeline, {
          maxTimeMS: 60000,
          allowDiskUse: true,
        })
        .toArray((err, results) => {
          if (err) {
            console.error("Error fetching searchedDocs data:", err);
            return [];
          }
          console.log("searchedDocs results:", results);
          // Handle the autocomplete results here
          return results;
        });
      console.log("... searchedDocs pipeline =>", searchedDocs);
      return {
        status: "success",
        data: searchedDocs,
        msg: "Searched Docs fetched successfully",
        count: searchedDocs.length,
      };
    } else {
      // * JUST FILTER AND NO SEARCH QUERY
      const simpleQuery = baseQuery(query)
        .skip(skipVal)
        .sort({ tLikes: -1, createdAt: -1 })
        .limit(pageSize)
        .lean();
      const docsQuery = simpleQuery;

      const [count, docs] = await Promise.all([
        Docs.countDocuments(query),
        docsQuery,
      ]);

      console.log("... filtered docs fetched ...");
      console.log(docs.length, "docs fetched from", count, "docs in total");
      return {
        status: "success",
        data: docs,
        msg: "Docs fetched successfully",
        count: count,
      };
    }
    return "test"; // to test if flow is mssing return
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
