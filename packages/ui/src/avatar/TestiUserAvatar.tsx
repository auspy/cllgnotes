import { Borders, TestiUser } from "@cllgnotes/types";
import Colors from "@cllgnotes/types/colors";
import Text from "../text/Text";
import { Avatar } from "../mui/mui";
const TestiUserAvatar = ({ username, img, name, onCard }: TestiUser) => {
  const user = name || username || "User";
  const size = onCard ? 50 : 70;
  return (
    <div className="frc">
      <Avatar
        style={{
          backgroundColor: Colors.lGrey,
          border: Borders.dark,
          height: size,
          width: size,
          color: Colors.dark,
        }}
      >
        {user[0]}
      </Avatar>
      <div className="ml15 fcfs">
        <Text
          textStyle={{ lineHeight: "108%" }}
          type={onCard ? "semi16" : "h3"}
          textTransform="capitalize"
        >
          {user}
        </Text>
        {onCard && (
          <Text type="medi16" color={"dGrey"} textTransform="capitalize">
            {username}
          </Text>
        )}
      </div>
    </div>
  );
};

export default TestiUserAvatar;
