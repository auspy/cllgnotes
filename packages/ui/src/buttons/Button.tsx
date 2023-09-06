import { ButtonProps, ButtonHeights } from "@cllgnotes/types/buttons";
import TmplButton from "../templates/buttons/TmplButton";

// this is wrpaper using template button. any changes to button should be done here.
// template button is just to setup the structure of the button.
const Button = ({
  height = ButtonHeights.medium,
  width = "100%",
  fontSize,
  ...props
}: ButtonProps) => {
  return <TmplButton {...props} height={height} width={width} />;
};

export default Button;
