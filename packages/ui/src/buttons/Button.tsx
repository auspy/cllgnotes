import {
  ButtonProps,
  ButtonHeights,
  ButtonFontSizes,
} from "@cllgnotes/types/types.buttons";
import TmplButton from "../templates/buttons/TmplButton";
import { FontWeightEnum } from "@cllgnotes/types/types.text";

// this is wrpaper using template button. any changes to button should be done here.
// template button is just to setup the structure of the button.
const Button = ({
  height = ButtonHeights.medium,
  width = "100%",
  fontSize = ButtonFontSizes.large,
  textProps,
  buttonStyles,
  boxShadow,
  buttonClasses,
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
      buttonStyles={{
        // boxShadow: boxShadow || ShadowsType.box3,
        ...buttonStyles,
      }}
      textProps={{ ...textProps }}
      buttonClasses={`priBtn ${fontClass} ${buttonClasses}`}
    />
  );
};

export default Button;
