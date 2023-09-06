import {
  ButtonProps,
  ButtonHeights,
  ButtonFontSizes,
} from "@cllgnotes/types/buttons";
import TmplButton from "../templates/buttons/TmplButton";
import { FontWeightEnum } from "@cllgnotes/types/types.text";

// this is wrpaper using template button. any changes to button should be done here.
// template button is just to setup the structure of the button.
const Button = ({
  height = ButtonHeights.medium,
  width = "100%",
  fontSize = ButtonFontSizes.large,
  textProps,
  ...props
}: ButtonProps) => {
  let fontClass: string = "";
  textProps = textProps || {
    textTransform: "uppercase",
    fontWeight: FontWeightEnum.bold,
  };
  if (fontSize == ButtonFontSizes.small) {
    textProps.textTransform = "capitalize";
  }
  return (
    <TmplButton
      {...props}
      fontSize={fontSize}
      height={height}
      width={width}
      textProps={{ ...textProps }}
      buttonClasses={`priBtn ${fontClass}`}
    />
  );
};

export default Button;
