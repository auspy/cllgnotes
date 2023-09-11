import { defaultImg } from "@cllgnotes/lib";
import { dummyCardsData } from "@cllgnotes/lib/dummyData";
import { BuyNowCard, DetailTabGroup, Text, TmplHero } from "ui";

const NotesHero = () => {
  const desc = "description of the course";
  // const deviceType = useContext(ContextDeviceType);
  // const sticky = useContext(ContextHeaderSticky);
  // const sticky = false;
  // const stickyStyle: React.CSSProperties = {
  //   position: "fixed",
  //   // top: 20,
  //   // right: "calc(50% - 580px)",
  //   transform: "translate(var(--x-buynowcard), -75%)",
  //   // right: 0,
  //   zIndex: 2000,
  //   transition: "transform 0.4s ease",
  // };
  const isDesktop = true;
  return (
    <>
      <TmplHero
        leftElement={
          <div style={{ width: "100%", maxWidth: 915 }}>
            <Text type="h2">
              Dynamic programming has a very long name that we cant even read
              properly and need some special people to do that
            </Text>
            <p className="regu16 mt15 mb20" style={{ opacity: 0.8 }}>
              {desc && desc.charAt(0)?.toUpperCase() + desc.slice(1)}
            </p>
            <DetailTabGroup data={[{ title: "title", value: "value" }]} />
          </div>
        }
        rightElement={
          <BuyNowCard
            price={146}
            {...defaultImg}
            style={{
              top: 30,
              right: 35,
            }}
            cardProps={dummyCardsData()[0]}
            _id={"1"}
          />
        }
      />
    </>
  );
};

export default NotesHero;
