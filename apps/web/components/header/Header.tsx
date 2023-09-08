import { ButtonBlack, Logo, Navigation } from "ui";
const Header = () => {
  return (
    <div className="frcsb topContainer py-[20px]">
      <Logo />
      {/* navigation */}
      <Navigation />
      {/* login btn */}
      <ButtonBlack text="Login" fontSize={14} height={49} />
    </div>
  );
};

export default Header;
