import {
  ButtonFontSizesBlack,
  ButtonHeightsBlackType,
  ButtonBlackProps,
} from "@cllgnotes/types";
import TmplButton from "../templates/buttons/TmplButton";
import Colors from "@cllgnotes/types/colors";
import { FontWeightEnum } from "@cllgnotes/types";

const ButtonBlack = ({
  fontSize = ButtonFontSizesBlack.large,
  height = ButtonHeightsBlackType.large,
  buttonClasses,
  ...props
}: ButtonBlackProps) => {
  return (
    <TmplButton
      {...props}
      buttonStyles={{
        backgroundColor: Colors.dark,
        color: Colors.white,
        borderRadius: 20,
      }}
      buttonClasses={`blackBtn ${buttonClasses}`}
      fontSize={fontSize}
      textProps={{
        textTransform: "uppercase",
        fontWeight: FontWeightEnum.semi,
      }}
      height={height}
      text={props.text}
      padding={props.padding || "15px 30px"}
    />
  );
};

export default ButtonBlack;
