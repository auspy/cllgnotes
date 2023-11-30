import { ButtonProps } from "@cllgnotes/types/types.buttons";
import Text from "../../text/Text";
import { FontSizeEnum } from "@cllgnotes/types/types.text";
import { CircularProgress } from "ui";
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
  loading,
  disabled,
}: ButtonProps) => {
  return (
    <button
      key={text}
      disabled={disabled || loading}
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
      {loading ? (
        <CircularProgress size={16} />
      ) : (
        <>
          {iconLeft && icon}
          {text && (
            <Text
              text={text}
              fontSize={fontSize as unknown as FontSizeEnum}
              {...textProps}
            />
          )}
          {!iconLeft && icon}
        </>
      )}
    </button>
  );
};

export default TmplButton;
