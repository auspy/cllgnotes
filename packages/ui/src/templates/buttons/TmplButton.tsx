import { ButtonProps } from "@cllgnotes/types";
import Text from "../../text/Text";
import { FontSizeEnum } from "@cllgnotes/types";
import { CircularProgress } from "../../mui/mui";
import Link from "next/link";
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
  href,
  boxShadow,
  active,
  onChange,
  ...prop
}: ButtonProps) => {
  const props = {
    disabled: disabled || loading,
    className: `frcc ${buttonClasses}`,
    style: {
      height: height,
      width: width,
      columnGap: iconGap,
      padding: padding,
      ...buttonStyles,
    },
  };
  const innerHtml = loading ? (
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
  );
  if (href) {
    return (
      <Link
        {...prop}
        key={text}
        {...props}
        className={props.className + " btn"}
        href={href}
      >
        {innerHtml}
      </Link>
    );
  }
  return (
    <button key={text} {...prop} {...props} onClick={onClick}>
      {innerHtml}
    </button>
  );
};

export default TmplButton;
