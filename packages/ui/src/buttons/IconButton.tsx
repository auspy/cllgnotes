"use client";
import { IconButtonProps } from "@cllgnotes/types/types.buttons";
import Button from "./Button";
import { ChevronRightRounded } from "@mui/icons-material";
import Colors from "@cllgnotes/types/colors";

const IconButton = ({
  size = 60,
  onBlack = false,
  icon = <ChevronRightRounded />,
  color,
  onClick,
}: IconButtonProps) => {
  const btnStyles: React.CSSProperties = {};
  if (color) {
    btnStyles.backgroundColor = Colors[color];
  }
  if (onBlack) {
    return (
      <button
        onClick={onClick}
        className={onBlack && `iconBtn`}
        style={{
          width: size,
          height: size,
          backgroundColor: color || "none",
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
