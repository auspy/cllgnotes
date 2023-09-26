import { BannerProps, Borders } from "@cllgnotes/types";
import Text from "../text/Text";
const MovingBanner = ({
  text,
  item,
  textType,
  repeat = 3,
  isLeft = false,
}: BannerProps) => {
  const arr = new Array(repeat).fill(text);
  return (
    <div
      className="w100"
      style={{
        borderTop: Borders.dark,
        borderBottom: Borders.dark,
        overflow: "hidden",
        whiteSpace: "nowrap",
        paddingBlock: "0.6%",
        minHeight: 40,
      }}
    >
      {text && (
        <div className={`${isLeft ? "moveLeft" : "moveRight"} frc slideIn`}>
          {arr.map((item, i) => (
            <Text
              key={i}
              textStyle={{ textShadow: "unset" }}
              textClass="fs0 ml5"
              text={item}
              type={textType}
            />
          ))}
        </div>
      )}
      {item}
    </div>
  );
};

export default MovingBanner;
