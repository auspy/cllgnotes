import { Borders, TestiCardProps } from "@cllgnotes/types";
import Colors from "@cllgnotes/types/colors";
import TestiUserAvatar from "../Avatar/TestiUserAvatar";
import Text from "../text/Text";
import ButtonLike from "../buttons/ButtonLike";

const TestiCard = ({
  text,
  user,
  date,
  likes,
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
        textClass="mt15 mb15"
        type="medi14"
        textTransform="uppercase"
        color="dGrey"
      >
        {date}
      </Text>
      <ButtonLike likes={likes} />
    </div>
  );
};

export default TestiCard;
