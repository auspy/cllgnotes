import { Borders, CardProps, DeviceTypeEnum } from "@cllgnotes/types";
import CardDetailsText from "../text/CardDetailsText";
import CardTextBox from "../text/CardTextBox";
import Image from "next/image";
import ButtonLike from "../buttons/ButtonLike";
import { memo } from "react";
import { ShowInDevice } from "@cllgnotes/lib";
import QuestionHighlight from "../QuestionHighlight";

const ListItem = ({
  img,
  subject,
  title,
  univ,
  department,
  course,
  semester,
  year,
  color,
  testType,
  _id,
  lastRef,
  likes = 56,
  type,
  highlights,
}: CardProps) => {
  const like = <ButtonLike likes={likes} />;
  return (
    <div
      ref={lastRef}
      className="frfs w100 pb-[10px] sm:pb-[15px]"
      style={{
        borderBottom: Borders.darkDash,
        overflow: "hidden",
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
      <div className="w100 flex flex-col gap-4">
        <div className="w100 flex flex-col gap-2 sm:gap-0">
          <div className="frfssb w100">
            <CardTextBox
              department={department}
              course={{ name: testType } as any}
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
            course={course}
            _id={_id}
            subject={subject}
            title={title}
            univ={univ}
            year={year}
            highlights={highlights}
            // testType={testType!}
            type={type}
            allowWrap={true}
          />
        </div>
        <QuestionHighlight highlights={highlights} questionsCount={2} />
      </div>
    </div>
  );
};

export default memo(ListItem);
