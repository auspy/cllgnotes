import { Chip, Stack, CloseRounded } from "../mui/mui";
import { ChipGrpProps } from "@cllgnotes/types";
import Text from "../text/Text";

const ChipGrp = ({
  setChipData,
  chipData = {},
  clearFilters,
}: ChipGrpProps) => {
  const handleDelete = (chipToDelete: string) => () => {
    const obj = { ...chipData };
    delete obj[chipToDelete];
    setChipData(obj);
  };
  const haveFilters = Object.keys(chipData).length > 0;
  return (
    <div className="frc w100" style={{}}>
      <Stack
        useFlexGap
        direction={"row"}
        className="flex-wrap"
        sx={{
          gap: 0.7,
        }}
      >
        {Object.keys(chipData).map((key, index) => {
          return (
            <Chip
              key={key + index}
              deleteIcon={<CloseRounded />}
              label={chipData[key]}
              onDelete={handleDelete(key)}
            />
          );
        })}
      </Stack>
      {haveFilters && (
        <button className="ml10" onClick={clearFilters}>
          <Text type="medi16" color="dGrey">
            Clear All
          </Text>
        </button>
      )}
    </div>
  );
};

export default ChipGrp;
