import { CardGrpProps } from "@cllgnotes/types";
import DocCard from "../cards/DocCard";
import Text from "../text/Text";
import ArrowBtns from "../buttons/ArrowBtns";

// this will be used to arrange cards in a group and will allow both scroll and even a grid like structure
const CardGrp = ({
  id,
  data,
  type = "row",
  rowGap = 20,
  colGap = 20,
  needHeading = true,
}: CardGrpProps) => {
  const isRow = type === "row";
  const containerClasses: string = isRow
    ? ` overflow-scroll overflow-y-hidden`
    : `flex-wrap`;
  return (
    <>
      <div className=" w100">
        {needHeading && (
          <Text type="h3" textClass="mb20" textTransform="uppercase">
            top picks
          </Text>
        )}
        <div className="frfs">
          {isRow && <ArrowBtns id={id} />}
          <div
            id={id}
            className={`w100 frc ${containerClasses}`}
            style={{
              columnGap: colGap,
              rowGap: isRow ? 0 : rowGap,
            }}
          >
            {data.map((cardData, i) => (
              <DocCard key={i + cardData.topic} {...cardData} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardGrp;
