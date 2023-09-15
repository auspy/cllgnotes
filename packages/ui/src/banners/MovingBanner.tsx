import { BannerProps, Borders } from "@cllgnotes/types";
import Text from "../text/Text";
const MovingBanner = ({ text, item, textType }: BannerProps) => {
  return (
    <div
      className="w100 frc"
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
        <Text
          textStyle={{ textShadow: "unset" }}
          textClass="fs0"
          text={text}
          type={textType}
        />
      )}
      {item}
    </div>
  );
};

export default MovingBanner;
