"use client";
import { GET_CREATED_DOCS } from "@/db/graphql/gql";
import { CardProps, DocsQueryProps } from "@cllgnotes/types";
import { modifyToCardsData } from "@cllgnotes/lib";
import { CardGrp } from "ui";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
const DashDocs = () => {
  console.log("in dasd docs", new Date().getSeconds());
  const { data, error } = useQuery<DocsQueryProps>(GET_CREATED_DOCS);
  // console.log("QUERY   HERE --->", GET_CREATED_DOCS);
  const courses = data?.getCreatedDocs?.data;
  const status = data?.getCreatedDocs?.status;
  const foundCourses = status == "success";
  const cardsData = modifyToCardsData(courses, {
    href: "dashboard",
    img: { width: undefined, height: undefined, fill: true } as any,
  });
  // console.log("DATA HERE --->", data?.getCreatedDocs, cardsData, error);
  if (
    !foundCourses ||
    courses?.length == 0 ||
    error ||
    !data ||
    !courses ||
    !cardsData
  ) {
    return <h4>No Docs Found</h4>;
  }
  return (
    <>
      <CardGrp
        needHeading={false}
        type="grid"
        id="dashDocs"
        style={{ width: "100%" }}
        data={cardsData as CardProps[]}
      />
    </>
  );
};

export default DashDocs;
