"use client";
import { IconButtonProps } from "@cllgnotes/types/types.buttons";
import Button from "./Button";
import { ChevronRightRounded } from "@mui/icons-material";
import Colors from "@cllgnotes/types/colors";
import ShadowsType from "@cllgnotes/types/shadows";

const IconButton = ({
  size = 60,
  onBlack = false,
  icon = <ChevronRightRounded />,
  color,
  onClick,
  buttonClasses,
}: IconButtonProps) => {
  const btnStyles: React.CSSProperties = {
    boxShadow: ShadowsType.box2,
  };
  if (size == 40) {
    btnStyles.boxShadow = ShadowsType.box1;
  }
  if (color) {
    btnStyles.backgroundColor = Colors[color];
  }
  if (onBlack) {
    return (
      <button
        onClick={onClick}
        className={`${onBlack && `iconBtn`} ${buttonClasses}`}
        style={{
          width: size,
          height: size,
          backgroundColor: (color && Colors[color]) || "none",
          border: "1px solid white",
          borderRadius: 5,
          color: "white",
        }}
      >
        {icon}
      </button>
    );
  }
  return (
    <>
      <Button
        buttonClasses={`${buttonClasses}`}
        onClick={onClick}
        buttonStyles={btnStyles}
        width={size}
        height={size}
        text=""
        icon={icon}
      />
    </>
  );
};

export default IconButton;
