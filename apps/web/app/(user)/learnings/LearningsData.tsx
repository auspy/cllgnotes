import { getClient } from "@/api/graphql/ApolloClient";
import { GET_PURCHASED_DOCS } from "@/api/graphql/gql";
import useServerSession from "@/components/hooks/useServerSession";
import { dummyCardsData, modifyToCardsData } from "@cllgnotes/lib";
import { CardProps, DocsQueryProps } from "@cllgnotes/types";
import { CardGrp, Text } from "ui";

const LearningsData = async () => {
  const session = (await useServerSession()) as any;
  const { data } = await getClient().query<DocsQueryProps>({
    query: GET_PURCHASED_DOCS,
    variables: { userId: session?.user?._id },
  });
  const cardData =
    (modifyToCardsData(data?.getPurchasedDocs?.data) as CardProps[]) || [];
  console.log(data.getPurchasedDocs?.data, "data");
  if (cardData.length == 0 || data?.getPurchasedDocs?.status != "success") {
    return (
      <div className="frc" style={{ height: "40vh", alignSelf: "" }}>
        <Text>DOCS PURCHASED WILL BE SHOWN HERE</Text>
      </div>
    );
  }
  return (
    <>
      <div className="topContainer mt60 mb-20">
        <CardGrp
          style={{
            width: "100%",
          }}
          id="mylearnings"
          data={cardData}
          type="grid"
          needHeading={false}
        />
      </div>
    </>
  );
};

export default LearningsData;
