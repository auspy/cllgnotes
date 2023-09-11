import Colors, { ColorsType } from "@cllgnotes/types/colors";
import { ButtonBlack, Logo, Navigation } from "ui";
const Header = ({ color }: { color?: ColorsType }) => {
  return (
    <div
      className="frcsb topContainer py-[20px]"
      style={{ backgroundColor: (color && Colors[color]) || "transparent" }}
    >
      <Logo />
      {/* navigation */}
      <Navigation />
      {/* login btn */}
      <ButtonBlack text="Login" fontSize={14} height={49} />
    </div>
  );
};

export default Header;
