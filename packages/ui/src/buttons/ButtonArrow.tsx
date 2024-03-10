import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import IconButton from "./IconButton";

const ButtonArrow = ({
  isLeft,
  onClick,
  style,
  disabled,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isLeft?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
}) => {
  const iconStyle: React.CSSProperties = {
    height: 30,
    width: 30,
    ...style,
  };
  const leftIcon = (
    <IconButton
      disabled={disabled}
      color={`${disabled ? "grey" : "white"}`}
      onClick={onClick}
      icon={<ChevronLeftRounded style={iconStyle} />}
    />
  );
  const rightIcon = (
    <IconButton
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
