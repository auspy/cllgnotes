import { Borders, CardTextBoxProps, TextProps } from "@cllgnotes/types";
import Text from "./Text";
import Colors from "@cllgnotes/types/colors";

const CardTextBox = ({
  department,
  course,
  semester,
  color,
  year,
  isAbsolute,
  padding,
  style,
}: CardTextBoxProps) => {
  const barTextProps: Partial<TextProps> = {
    type: "semi12",
  };
  const absStyles: React.CSSProperties = {
    transform: "translateY(-50%)",
    position: "absolute",
  };
  if (!(year || department || course)) {
    return <div></div>;
  }
  return (
    <div style={{ display: "grid" }}>
      <div
        className={`frc`}
        style={{
          padding: padding || "7px 15px",
          ...(isAbsolute ? absStyles : {}),
          border: Borders.dark,
          columnGap: 8,
          borderRadius: 5,
          backgroundColor: Colors[color || "white"],
          justifySelf: "center",
          ...style,
        }}
      >
        {Boolean(department) && <Text {...barTextProps}>{"department"}</Text>}
        {Boolean(department && course) && <Text {...barTextProps}>{"•"}</Text>}
        {Boolean(course) && <Text {...barTextProps}>{"department"}</Text>}
        {Boolean(semester) && (
          <>
            <Text {...barTextProps}>{"•"}</Text>
            <Text {...barTextProps}>{String(semester + " sem")}</Text>
          </>
        )}
      </div>
    </div>
  );
};

export default CardTextBox;
