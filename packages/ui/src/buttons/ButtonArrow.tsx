import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import IconButton from "./IconButton";

const ButtonArrow = ({
  isLeft,
  onClick,
  style,
  disabled,
  size = 40,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isLeft?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  size?: 40 | 60;
}) => {
  const iconStyle: React.CSSProperties = {
    height: 30,
    width: 30,
    ...style,
  };
  const leftIcon = (
    <IconButton
      size={size}
      disabled={disabled}
      color={`${disabled ? "grey" : "white"}`}
      onClick={onClick}
      icon={<ChevronLeftRounded style={iconStyle} />}
    />
  );
  const rightIcon = (
    <IconButton
      size={size}
      disabled={disabled}
      color={`${disabled ? "grey" : "white"}`}
      onClick={onClick}
      icon={<ChevronRightRounded style={iconStyle} />}
    />
  );
  if (isLeft) {
    return leftIcon;
  }
  return rightIcon;
};

export default ButtonArrow;
