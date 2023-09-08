import { ButtonBlack, Logo, Navigation } from "ui";
import { dummyNavData } from "@cllgnotes/lib/dummyData/data.header";
const Header = () => {
  return (
    <div className="frcsb topContainer py-[20px]">
      <Logo />
      {/* navigation */}
      <Navigation data={dummyNavData} />
      {/* login btn */}
      <ButtonBlack text="Login" fontSize={14} height={49} />
    </div>
  );
};

export default Header;
