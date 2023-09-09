import { Borders, TestiCardProps } from "@cllgnotes/types";
import Colors from "@cllgnotes/types/colors";
import TestiUserAvatar from "../avatar/TestiUserAvatar";
import Text from "../text/Text";
import { FavoriteBorderRounded, IconButton } from "../mui/mui";

const TestiCard = ({
  text,
  user,
  date,
  likes,
  reposts,
  style,
  _class,
}: TestiCardProps) => {
  return (
    <div
      className={`w100 fcc p20 ${_class}`}
      style={{
        border: Borders.dark,
        backgroundColor: Colors.white,
        borderRadius: 5,
        maxWidth: 420,
        minWidth: 220,
        height: "fit-content",
        breakInside: "avoid",
        ...style,
      }}
    >
      <TestiUserAvatar {...user} onCard={true} />
      <Text textClass="mt20" type="medi16">
        {text}
      </Text>
      <Text
        textClass="mt15"
        type="medi14"
        textTransform="uppercase"
        color="dGrey"
      >
        {date}
      </Text>
      <div className="frc mt15" style={{ color: Colors.dGrey, columnGap: 5 }}>
        <IconButton size="small">
          <FavoriteBorderRounded color="inherit" />
        </IconButton>
        <Text type="medi12">{String(likes)}</Text>
      </div>
    </div>
  );
};

export default TestiCard;
