import Colors from "@cllgnotes/types/colors";
import EarnMoneyFooter from "./EarnMoneyFooter";
import { IconButton, Logo, Navigation, Text } from "ui";
import IconInsta from "@public/icons/IconInsta";
import IconTwitter from "@public/icons/IconTwitter";
const Footer = ({ earnMoney = false }: { earnMoney?: boolean }) => {
  return (
    <div
      className="w100 rPosi fcc"
      style={{
        backgroundColor: Colors.lDark,
        marginTop: earnMoney ? 185 : 0,
        paddingBottom: 30,
        paddingTop: earnMoney ? 532 : 40,
      }}
    >
      {earnMoney && (
        <EarnMoneyFooter
          containerStyle={{
            position: "absolute",
            bottom: 185,
          }}
        />
      )}
      <div className="frfesb topContainer">
        <Logo fontSize={36} color="white" />
        <div className="frc" style={{ gap: 30 }}>
          <IconButton onBlack={true} icon={IconInsta("white")} />
          <IconButton onBlack={true} icon={IconTwitter("white")} />
        </div>
      </div>
      <div className="frcsb topContainer mt30">
        <Text color="dGrey" type="medi16">
          @cllgnotes.com. All rights resserved
        </Text>
        <Navigation color="dGrey" textTransform="capitalize" />
      </div>
    </div>
  );
};

export default Footer;
