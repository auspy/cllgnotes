import Colors, { ColorsType } from "@cllgnotes/types/colors";
import { LinkButton, Logo, Navigation } from "ui";
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
      <LinkButton text="Login" href="/auth" />
    </div>
  );
};

export default Header;
