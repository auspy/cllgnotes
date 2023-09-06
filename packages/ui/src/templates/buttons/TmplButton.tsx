import { ButtonProps } from "@cllgnotes/types/buttons";
import Text from "../../text/Text";
import { FontSizeEnum } from "@cllgnotes/types/types.text";
// TemplateButton
// files needed: common.css
const TmplButton = ({
  text,
  onClick,
  buttonStyles,
  buttonClasses,
  textProps,
  icon,
  height,
  fontSize,
  width,
  iconLeft,
  padding,
  iconGap = 10,
}: ButtonProps) => {
  return (
    <button
      key={text}
      className={`frcc ${buttonClasses}`}
      style={{
        height: height,
        width: width,
        columnGap: iconGap,
        padding: padding,
        ...buttonStyles,
      }}
      onClick={onClick}
    >
      {iconLeft && icon}
      <Text
        text={text}
        fontSize={fontSize as unknown as FontSizeEnum}
        {...textProps}
      />
      {!iconLeft && icon}
    </button>
  );
};

export default TmplButton;
