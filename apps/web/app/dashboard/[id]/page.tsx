import { getClient } from "@/db/graphql/ApolloClient";
import { GET_DOC } from "@/db/graphql/gql";
// import FormNewDoc from "@/components/forms/FormNewDoc";
import { Heading, Text } from "ui";
import { DocsQueryProps, FormTypeEnum } from "@cllgnotes/types";

const page = async ({
  params,
}: {
  params: {
    id?: string;
  };
}) => {
  // get course data
  const { data } = await getClient().query<DocsQueryProps>({
    query: GET_DOC,
    variables: { id: params.id },
  });
  const doc = data?.getDoc?.data?.[0];
  const status = data?.getDoc?.status;
  const foundCourses = status == "success";
  // console.log("dashboard/id", doc);
  if (!foundCourses || !doc) {
    return <h4>Doc not found</h4>;
  }
  return (
    <>
      <Text type="h2" text={"Course: " + doc.title || "Update Course"} />
      {/* <FormNewDoc formType={FormTypeEnum.NEW} {...(doc as any)} /> */}
    </>
  );
};

export default page;
