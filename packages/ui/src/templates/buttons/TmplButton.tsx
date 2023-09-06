import { ButtonProps } from "@cllgnotes/types/buttons";
// TemplateButton
// files needed: common.css
const TmplButton = ({
  text,
  onClick,
  buttonStyles,
  buttonClasses,
  buttonTextClasses,
  buttonTextStyles,
  icon,
  height,
  width,
  iconLeft,
}: ButtonProps) => {
  return (
    <button
      className={`gcc ${buttonClasses}`}
      style={{ height: height, width: width, ...buttonStyles }}
      onClick={onClick}
    >
      {iconLeft && icon}
      <div className={`${buttonTextClasses}`} style={{ ...buttonTextStyles }}>
        {text}
      </div>
      {!iconLeft && icon}
    </button>
  );
};

export default TmplButton;
