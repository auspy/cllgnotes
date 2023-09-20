import { ButtonProps } from "@cllgnotes/types/types.buttons";
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
  disabled,
}: ButtonProps) => {
  return (
    <button
      key={text}
      disabled={disabled}
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
      {text && (
        <Text
          text={text}
          fontSize={fontSize as unknown as FontSizeEnum}
          {...textProps}
        />
      )}
      {!iconLeft && icon}
    </button>
  );
};

export default TmplButton;
