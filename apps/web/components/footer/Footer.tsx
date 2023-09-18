import Colors from "@cllgnotes/types/colors";
import EarnMoneyFooter from "./EarnMoneyFooter";
import { IconButton, Logo, Navigation, Text } from "ui";
import IconInsta from "@public/icons/IconInsta";
import IconTwitter from "@public/icons/IconTwitter";
const Footer = ({ earnMoney = false }: { earnMoney?: boolean }) => {
  return (
    <div
      className={`w100 rPosi fcc p-5 sm:p-7 ${
        earnMoney
          ? "mt-[350px] pt-[682px] sm:mt-[280px] sm:pt-[632px] lg:mt-[185px] lg:pt-[532px]"
          : "pt-[40px]"
      }`}
      style={{
        backgroundColor: Colors.lDark,
      }}
    >
      {earnMoney && (
        <EarnMoneyFooter
          containerClass={`bottom-[500px] sm:bottom-[185px]`}
          containerStyle={{
            position: "absolute",
          }}
        />
      )}
      <div className="frfesb topContainer gap-5 flex-wrap justify-center sm:justify-between ">
        <Logo fontSize={36} color="white" />
        <div className="frc" style={{ gap: 30 }}>
          <IconButton onBlack={true} icon={IconInsta("white")} />
          <IconButton onBlack={true} icon={IconTwitter("white")} />
        </div>
      </div>
      <div className="flex-col-reverse gap-5 items-center sm:flex-row frcsb topContainer mt30">
        <Text color="dGrey" type="medi16">
          @cllgnotes.com. All rights resserved
        </Text>
        <Navigation color="dGrey" textTransform="capitalize" />
      </div>
    </div>
  );
};

export default Footer;
