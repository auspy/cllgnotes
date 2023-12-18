import Link from "next/link";
import { Chip, Stack, CloseRounded } from "../mui/mui";
import Text from "../text/Text";
import { pathExplore, useRecoilFilter } from "@cllgnotes/lib";

const ChipGrp = () => {
  const { clearFilters, removeFilter, filters, queryMap } = useRecoilFilter();
  const haveFilters = Object.keys(filters).length > 0;
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
        {Object.keys(filters).map((key, index) => {
          return (
            typeof filters[key] == "object" &&
            Object.keys(filters[key]).map((filter, i) => (
              <Chip
                key={filter + index + i}
                deleteIcon={
                  <Link
                    href={{
                      pathname: "/explore",
                      query: queryMap({ key, label: filter }),
                    }}
                  >
                    <CloseRounded />
                  </Link>
                }
                label={filter}
                onDelete={() => removeFilter({ key, label: filter })}
              />
            ))
          );
        })}
      </Stack>
      {haveFilters && (
        <Link href={pathExplore()} className="ml10" onClick={clearFilters}>
          <Text type="medi16" color="dGrey">
            Clear All
          </Text>
        </Link>
      )}
    </div>
  );
};

export default ChipGrp;
