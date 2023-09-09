import { Borders, CardProps } from "@cllgnotes/types";
import CardDetailsText from "../text/CardDetailsText";
import CardTextBox from "../text/CardTextBox";
import Image from "next/image";
import ButtonLike from "../buttons/ButtonLike";

const ListItem = ({
  img,
  subject,
  topic,
  univ,
  department,
  course,
  semester,
  color,
  likes = 56,
}: CardProps) => {
  const size = 120;
  return (
    <div
      className="frc w100"
      style={{
        borderBottom: Borders.darkDash,
        paddingBottom: 15,
      }}
    >
      <div
        className="rPosi mr20 fs0"
        style={{
          width: size,
          height: size,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <Image {...img} />
      </div>
      <div className="w100">
        <div className="frfssb w100">
          <CardTextBox
            department={department}
            course={course}
            semester={semester}
            color={color}
            padding="4px 9px"
          />
          <ButtonLike likes={likes} />
        </div>
        <CardDetailsText subject={subject} topic={topic} univ={univ} />
      </div>
    </div>
  );
};

export default ListItem;
