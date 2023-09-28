import { Borders, CardProps, DeviceTypeEnum } from "@cllgnotes/types";
import CardDetailsText from "../text/CardDetailsText";
import CardTextBox from "../text/CardTextBox";
import Image from "next/image";
import ButtonLike from "../buttons/ButtonLike";
import { memo } from "react";
import { ShowInDevice } from "@cllgnotes/lib";

const ListItem = ({
  img,
  subject,
  title,
  univ,
  department,
  course,
  semester,
  subjectCode,
  year,
  color,
  testType,
  _id,
  likes = 56,
}: CardProps) => {
  const like = <ButtonLike likes={likes} />;
  return (
    <div
      className="frfs w100 pb-[10px] sm:pb-[15px]"
      style={{
        borderBottom: Borders.darkDash,
      }}
    >
      <div>
        <div
          className={`rPosi mr20 w-[80px] h-[80px] sm:h-[120px] sm:w-[120px]`}
          style={{
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <Image {...img} style={{ objectFit: "cover" }} />
        </div>
        <ShowInDevice devices={[DeviceTypeEnum.mobile]}>{like}</ShowInDevice>
      </div>

      <div className="w100 flex flex-col gap-2 sm:gap-0">
        <div className="frfssb w100">
          <CardTextBox
            department={department}
            course={course}
            semester={semester}
            color={color}
            year={year}
            padding="4px 9px"
          />
          <ShowInDevice
            devices={[DeviceTypeEnum.tablet, DeviceTypeEnum.desktop]}
          >
            {like}
          </ShowInDevice>
        </div>
        <CardDetailsText
          _id={_id}
          subject={subject}
          title={title}
          univ={univ}
          subjectCode={subjectCode}
          year={year}
          testType={testType!}
        />
      </div>
    </div>
  );
};

export default memo(ListItem);
