"use client";
import { IconButtonProps } from "@cllgnotes/types";
import Button from "./Button";
import { ChevronRightRounded } from "@mui/icons-material";
import Colors from "@cllgnotes/types/colors";
import Link from "next/link";

const IconButton = ({
  size = 60,
  onBlack = false,
  icon = <ChevronRightRounded />,
  color,
  onClick,
  buttonClasses,
  disabled,
  href,
  ...props
}: IconButtonProps) => {
  const btnStyles: React.CSSProperties = {};
  const shadowClass = size == 40 ? "shadow-box1" : "shadow-box2";
  if (color) {
    btnStyles.backgroundColor = Colors[color];
  }
  if (disabled) {
    btnStyles.backgroundColor = Colors["lGrey"];
  }
  const buttonProps = {
    disabled: disabled,

    className: `${
      onBlack && `iconBtn`
    } flex flex-col items-center justify-center ${buttonClasses}`,
    style: {
      width: size,
      height: size,
      backgroundColor: (color && Colors[color]) || "none",
      border: "1px solid white",
      borderRadius: 5,
      color: "white",
    },
    ...props,
  };
  if (onBlack) {
    if (href) {
      return (
        <Link href={href} {...buttonProps}>
          {icon}
        </Link>
      );
    }
    return (
      <button {...buttonProps} onClick={onClick}>
        {icon}
      </button>
    );
  }
  return (
    <>
      <Button
        disabled={disabled}
        buttonClasses={`${shadowClass} ${buttonClasses}`}
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
