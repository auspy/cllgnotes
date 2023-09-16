import { ButtonDrawerToggle } from "@cllgnotes/types";
import { ArrowLeftRounded, ArrowRightRounded } from "ui";

const ButtonDrawerToggle = ({
  isOpen,
  setIsOpen,
  buttonClasses,
  buttonStyles,
}: ButtonDrawerToggle) => {
  return (
    <button
      style={buttonStyles}
      className={buttonClasses}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {isOpen ? (
        <ArrowLeftRounded fontSize="medium" />
      ) : (
        <ArrowRightRounded fontSize="medium" />
      )}
    </button>
  );
};

export default ButtonDrawerToggle;
