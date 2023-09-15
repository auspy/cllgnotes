import Colors, { ColorsType } from "@cllgnotes/types/colors";
import { ButtonLogin, LinkButton, Logo, Navigation } from "ui";
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
      <ButtonLogin />
    </div>
  );
};

export default Header;
