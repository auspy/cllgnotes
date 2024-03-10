import Colors, { ColorsType } from "@cllgnotes/types/colors";
import { ShowInDevice } from "@cllgnotes/lib";
import { DeviceTypeEnum } from "@cllgnotes/types";
import Logo from "./logo";
import Navigation from "./Navigation";
import RightDrawer from "../drawer/RightDrawer";
import ButtonLogin from "../buttons/ButtonLogin";
const Header = ({ color }: { color?: ColorsType }) => {
  return (
    <div
      id="header"
      className="frcsb topContainer py-[20px] rPosi"
      style={{ backgroundColor: (color && Colors[color]) || "transparent" }}
    >
      <Logo />
      {/* navigation */}
      {/* <div className="hideInMobile"> */}
      <ShowInDevice devices={[DeviceTypeEnum.desktop]}>
        <Navigation />
      </ShowInDevice>
      {/* </div> */}
      {/* login btn */}
      <div className="frc gap-x-3">
        <RightDrawer />
        <ButtonLogin />
      </div>
    </div>
  );
};

export default Header;
