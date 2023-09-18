import { NotesHeroTextProps, DeviceTypeEnum } from "@cllgnotes/types";
import { ShowInDevice } from "@cllgnotes/lib";
import { BuyNowCard, TmplHero } from "ui";
import NotesPageTextBox from "./NotesPageTextBox";
import { defaultImg } from "@cllgnotes/lib";

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
  const notLoggedIn = true;
  const textbox = (
    <NotesPageTextBox
      title={title}
      labels={labels}
      desc={desc}
      img={defaultImg}
    />
  );
  return (
    <>
      <TmplHero
        leftElement={
          <ShowInDevice devices={[DeviceTypeEnum.desktop]}>
            {textbox}
          </ShowInDevice>
        }
        rightElement={
          notLoggedIn && (
            <BuyNowCard price={146} {...img} _id={"1"}>
              {textbox}
            </BuyNowCard>
          )
        }
        height={422}
      />
    </>
  );
};

export default NotesHero;
