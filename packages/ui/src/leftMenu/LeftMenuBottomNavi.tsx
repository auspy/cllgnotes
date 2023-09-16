import { LeftMenuBottomNaviProps } from "@cllgnotes/types";
import { ButtonDrawerToggle } from "ui";

const LeftMenuBottomNavi = ({
  isExpanded,
  setIsExpanded,
}: LeftMenuBottomNaviProps) => {
  const isExpandedButtonStyle = {
    borderLeft: "var(--light-border)",
    float: "right",
  };
  const buttonStyle = {
    padding: 15,
  };
  if (isExpanded) {
    Object.assign(buttonStyle, isExpandedButtonStyle);
  }
  return (
    <div
      className={`${!isExpanded && "fcc w100"}`}
      style={{ borderTop: "var(--light-border)" }}
    >
      <ButtonDrawerToggle
        buttonStyles={buttonStyle}
        isOpen={isExpanded}
        setIsOpen={setIsExpanded}
      />
    </div>
  );
};

export default LeftMenuBottomNavi;
