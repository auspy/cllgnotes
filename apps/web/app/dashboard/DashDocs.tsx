"use client";
import { GET_CREATED_DOCS } from "@/api/graphql/gql";
import { DocProps, DocsQueryProps } from "@cllgnotes/types";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { modifyCoursesData, modifyToCardsData } from "@cllgnotes/lib";
import { CardGrp } from "ui";
const DashCourses = () => {
  const { data, error } = useSuspenseQuery<DocsQueryProps>(GET_CREATED_DOCS);
  const courses = data?.getCreatedDocs?.data;
  const status = data?.getCreatedDocs?.status;
  const foundCourses = status == "success";
  console.log("data", data?.getCreatedDocs);
  if (!foundCourses || courses?.length == 0 || error || !data || !courses) {
    return <h4>No Docs Found</h4>;
  }
  return (
    <>
      <CardGrp
        needHeading={false}
        type="grid"
        id="dashDocs"
        data={modifyToCardsData(courses as DocProps[], { href: "dashboard" })}
      />
    </>
  );
};

export default DashCourses;
