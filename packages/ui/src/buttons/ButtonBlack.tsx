import {
  ButtonFontSizesBlack,
  ButtonHeightsBlackType,
  ButtonProps,
} from "@cllgnotes/types/buttons";
import TmplButton from "../templates/buttons/TmplButton";
import ColorsType from "@cllgnotes/types/colors";
import { FontWeightEnum } from "@cllgnotes/types/types.text";

const ButtonBlack = ({
  fontSize = ButtonFontSizesBlack.large,
  height = ButtonHeightsBlackType.large,
  ...props
}: ButtonProps) => {
  return (
    <TmplButton
      {...props}
      buttonStyles={{
        backgroundColor: ColorsType.dark,
        color: ColorsType.white,
        borderRadius: 20,
      }}
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
