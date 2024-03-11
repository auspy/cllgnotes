import { NotesHeroTextProps, DeviceTypeEnum } from "@cllgnotes/types";
import { ShowInDevice } from "@cllgnotes/lib";
import { BuyNowCard, TmplHero } from "ui";
import NotesPageTextBox from "./NotesPageTextBox";
import { defaultImg } from "@cllgnotes/lib";

const NotesHero = ({
  title,
  labels,
  desc,
  img,
  notPurchased = true,
  ...props
}: NotesHeroTextProps | any) => {
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
  const textbox = (
    <NotesPageTextBox
      notPurchased={notPurchased}
      title={title}
      labels={labels}
      desc={desc}
      img={defaultImg}
      {...props}
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
          notPurchased && (
            <BuyNowCard {...props} {...img}>
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
