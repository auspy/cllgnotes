import { CardGrpProps, DeviceTypeEnum } from "@cllgnotes/types";
import DocCard from "../cards/DocCard";
import Text from "../text/Text";
import ArrowBtns from "../buttons/ArrowBtns";
import { ShowInDevice } from "@cllgnotes/lib";
import { CircularProgress } from "@mui/material";

// this will be used to arrange cards in a group and will allow both scroll and even a grid like structure
const CardGrp = ({
  id,
  data,
  type = "row",
  rowGap = 20,
  colGap = 20,
  needHeading = true,
  heading,
  style,
  lastRef,
  loadingMore,
}: CardGrpProps) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }
  const isRow = type === "row";
  const containerClasses: string = isRow
    ? ` overflow-scroll overflow-y-hidden frc`
    : `grid`;
  return (
    <>
      <div className=" w100">
        {needHeading && (
          <Text type="h3" textClass="mb20" textTransform="uppercase">
            {heading || "top picks"}
          </Text>
        )}
        <div className="frfs">
          {isRow && (
            <ShowInDevice devices={[DeviceTypeEnum.desktop]}>
              <ArrowBtns id={id} />
            </ShowInDevice>
          )}
          <div
            id={id}
            className={`w100   ${containerClasses}`}
            style={{
              columnGap: colGap,
              rowGap: isRow ? 0 : rowGap,
              width: "min-content",
              grid: "auto-flow / repeat(auto-fill, minmax(320px, 1fr))",
              ...style,
            }}
          >
            {data.map((cardData, i) => (
              <DocCard
                isGrid={true}
                key={i + (cardData.title ? cardData.title : "0")}
                {...cardData}
                lastRef={i === data.length - 1 ? lastRef : undefined}
              />
            ))}
            {loadingMore && <CircularProgress size={14} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardGrp;
