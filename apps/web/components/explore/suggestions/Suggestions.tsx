"use client";
import { useRecoilFilter } from "@cllgnotes/lib";
import { dummyFilterSteps } from "@cllgnotes/lib/dummyData";
import type { AddFilterProps, ButtonProps } from "@cllgnotes/types";
import { useState } from "react";
import { ButtonRow, Text } from "ui";

type SuggestionsProps = AddFilterProps & {
  selected: string[];
};
const Suggestions = ({}: SuggestionsProps) => {
  const { addFilter, filters } = useRecoilFilter();
  const data = dummyFilterSteps;
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleCurrentIndex = () => {
    setCurrentIndex((prev) => prev + 1);
  };
  const currentData = data[currentIndex]?.data;
  const select = Boolean(data[currentIndex]?.key) && [
    data[currentIndex].key,
    filters[data[currentIndex].key],
  ];
  if (currentIndex >= data.length) {
    return <></>;
  }
  return (
    <div>
      <Text textClass="mb20" type="h3">
        {data?.[currentIndex]?.title}
      </Text>
      {/* <ButtonRow data={dummyFilterGrpsDocType} maxWidth={434} minWidth={220} /> */}
      <ButtonRow
        onClick={(e, chip, i) => {
          handleCurrentIndex();
          // SCROLL INTO VIEW
          if (Object.keys(filters).length == 0 || chip.key == "More") {
            document.getElementsByClassName("filterButton")[0].scrollIntoView({
              behavior: "smooth",
              block: "center",
              // inline: "center",
            });
            if (chip.key == "More") return;
          }
          addFilter(chip);
        }}
        commonButtonProps={{
          buttonClasses: "filterButton",
        }}
        select={(select as any) || undefined}
        data={currentData as ButtonProps[]}
        // maxWidth={318}
        minWidth={220}
        height={90}
      />
    </div>
  );
};

export default Suggestions;
