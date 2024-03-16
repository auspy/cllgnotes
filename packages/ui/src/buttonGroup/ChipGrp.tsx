"use client";
import Link from "next/link";
import { Chip, Stack, CloseRounded } from "../mui/mui";
import Text from "../text/Text";
import { pathExplore, useRecoilFilter } from "@cllgnotes/lib";
import { useRouter, useSearchParams } from "next/navigation";

const ChipGrp = () => {
  const { clearFilters, removeFilter, filters, queryMap } = useRecoilFilter();
  const haveFilters = Object.keys(filters).length > 0;
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const router = useRouter();
  const chips = Object.keys(filters);
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
        {search && (
          <Chip
            deleteIcon={
              <Link
                href={{
                  pathname: "/explore",
                  query: queryMap(),
                }}
              >
                <CloseRounded />
              </Link>
            }
            label={"search: " + search}
            onDelete={() => router.push("/explore?" + queryMap().toString())}
          />
        )}
        {chips.map((key, index) => {
          // console.log(Object.keys(filters[key]), key, filters[key]);
          return (
            typeof filters[key] == "object" &&
            Object.keys(filters[key]).map((filterKey, i) => {
              const val = filters[key][filterKey];
              const isStr = typeof val == "string";
              return (
                <Chip
                  key={filterKey + index + i}
                  deleteIcon={
                    <Link
                      href={{
                        pathname: "/explore",
                        query: queryMap({ key, label: filterKey }),
                      }}
                    >
                      <CloseRounded />
                    </Link>
                  }
                  label={isStr ? val : filterKey}
                  onDelete={() => removeFilter({ key, label: filterKey })}
                />
              );
            })
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
