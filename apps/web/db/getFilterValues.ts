import { FilterKeys } from "@cllgnotes/types";
import { DocumentNode } from "graphql";
import {
  GET_COURSES,
  GET_DEPARTMENTS,
  GET_SUBJECTS,
  GET_ALL_FILTERS,
} from "./graphql/gql";
import { getClient } from "./graphql/ApolloClient";

export const getFilterValues = async (filter: FilterKeys | "All" = "All") => {
  const queryOpts: Record<FilterKeys | "All", DocumentNode | any[]> = {
    Course: GET_COURSES,
    Department: GET_DEPARTMENTS,
    Subject: GET_SUBJECTS,
    Year: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    Semester: [1, 2, 3, 4, 5, 6, 7, 8],
    All: GET_ALL_FILTERS,
  };
  try {
    const query = queryOpts[filter];
    if (Array.isArray(query)) {
      return query;
    }
    const { data, error } = await getClient().query({
      query,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log("error in getFilterValues for ", filter, error);
    return null;
  }
};
