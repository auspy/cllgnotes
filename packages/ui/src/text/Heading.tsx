import { HeadingProps, HeadingType } from "@cllgnotes/types";
import { memo } from "react";

const Heading = ({
  text,
  highlightText,
  headingClass,
  afterHighlightText,
  type = 1,
  capitalise = false,
  uppercase = false,
  highlightTextStyle,
  highlightTextClass,
  headingStyle,
  id,
}: HeadingProps) => {
  const headingStyles: React.CSSProperties = {
    ...headingStyle,
  };
  if (capitalise) {
    headingStyles["textTransform"] = "capitalize";
  }
  if (uppercase) {
    headingStyles["textTransform"] = "uppercase";
  }
  const data = (
    <>
      {text}
      {highlightText && (
        <>
          <span
            className={`h${type + 1}Highlight ${highlightTextClass}`}
            style={highlightTextStyle}
          >
            {" "}
            {highlightText}{" "}
          </span>
        </>
      )}
      {afterHighlightText}
    </>
  );
  const headingProps = {
    className: `${headingClass}`,
    style: headingStyles,
    id,
  };
  const HeadingElement = () => {
    switch (type) {
      case HeadingType.h1:
        return <h1 {...headingProps}>{data}</h1>;
      case HeadingType.h2:
        return <h2 {...headingProps}>{data}</h2>;
      case HeadingType.h3:
        return <h3 {...headingProps}>{data}</h3>;
      case HeadingType.h4:
        return <h4 {...headingProps}>{data}</h4>;
      case HeadingType.h5:
        return <h5 {...headingProps}>{data}</h5>;
      default:
        return <></>;
    }
  };
  return HeadingElement();
};

// todo check why memo(Heading) not working
export default Heading;
