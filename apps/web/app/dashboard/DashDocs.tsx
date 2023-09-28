"use client";
import { GET_CREATED_DOCS } from "@/api/graphql/gql";
import { DocsQueryProps } from "@cllgnotes/types";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { modifyToCardsData } from "@cllgnotes/lib";
import { CardGrp } from "ui";
const DashDocs = () => {
  const { data, error } = useSuspenseQuery<DocsQueryProps>(GET_CREATED_DOCS);
  // console.log("QUERY   HERE --->", GET_CREATED_DOCS);
  const courses = data?.getCreatedDocs?.data;
  const status = data?.getCreatedDocs?.status;
  const foundCourses = status == "success";
  const cardsData = modifyToCardsData(courses, {
    href: "dashboard",
    img: { width: undefined, height: undefined, fill: true },
  });
  // console.log("DATA HERE --->", data?.getCreatedDocs, cardsData, error);
  if (!foundCourses || courses?.length == 0 || error || !data || !courses) {
    return <h4>No Docs Found</h4>;
  }
  return (
    <>
      <CardGrp
        needHeading={false}
        type="grid"
        id="dashDocs"
        style={{ width: "100%" }}
        data={cardsData}
      />
    </>
  );
};

export default DashDocs;
