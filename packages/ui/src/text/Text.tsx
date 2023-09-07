import {
  HeadingType,
  TextProps,
  textClasses,
} from "@cllgnotes/types/types.text";
import Heading from "./Heading";
import Colors from "@cllgnotes/types/colors";

const Text = ({
  type,
  textClass,
  textStyle,
  color,
  text,
  textTransform,
  textAlign,
  ...props
}: TextProps) => {
  const classs = `${type && textClasses[type]} ${textClass}`;
  const stylee = { textAlign, textTransform, ...props, ...textStyle };
  if (color) {
    stylee.color = Colors[color];
  }
  if (type?.includes("h")) {
    return (
      <Heading
        text={text}
        headingClass={classs}
        headingStyle={stylee}
        type={
          HeadingType[
            type.substring(0, 2) as unknown as HeadingType
          ] as unknown as HeadingType
        }
      />
    );
  }
  return (
    <p className={classs} style={stylee}>
      {text}
    </p>
  );
};

export default Text;
