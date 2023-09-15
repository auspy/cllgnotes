import { NotesHeroTextProps } from "@cllgnotes/types";
import { BuyNowCard, DetailTabGroup, Text, TmplHero } from "ui";

const NotesHero = ({ title, labels, desc, img }: NotesHeroTextProps) => {
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
  const notLoggedIn = true;
  const firstLetterUppercase = (str: string) =>
    str.charAt(0)?.toUpperCase() + str.slice(1);
  return (
    <>
      <TmplHero
        leftElement={
          <div style={{ width: "100%", maxWidth: notLoggedIn ? 915 : "none" }}>
            <Text type="h2">{firstLetterUppercase(title)}</Text>
            <p className="regu16 mt15 mb20" style={{ opacity: 0.8 }}>
              {firstLetterUppercase(desc)}
            </p>
            <DetailTabGroup data={labels} />
          </div>
        }
        rightElement={
          notLoggedIn && (
            <BuyNowCard
              price={146}
              {...img}
              style={{
                top: 30,
                right: 35,
              }}
              cardProps={[] as any}
              _id={"1"}
            />
          )
        }
        height={422}
      />
    </>
  );
};

export default NotesHero;
