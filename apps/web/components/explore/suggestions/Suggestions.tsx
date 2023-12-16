"use client";
import { dummyFilterSteps } from "@cllgnotes/lib/dummyData";
import type { AddFilterProps } from "@cllgnotes/types";
import { useState } from "react";
import { ButtonRow, Text } from "ui";

type SuggestionsProps = AddFilterProps & {
  selected: string[];
};
const Suggestions = ({ addFilter, selected }: SuggestionsProps) => {
  const data = dummyFilterSteps;
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleCurrentIndex = () => {
    setCurrentIndex((prev) => prev + 1);
  };
  const currentData = data[currentIndex]?.data;
  const select = new Set(selected);
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
          if (selected.length == 0 || chip.key == "More") {
            document.getElementsByClassName("filterButton")[0].scrollIntoView({
              behavior: "smooth",
              block: "center",
              // inline: "center",
            });
            if (chip.key == "More") return;
          }

          // SHOW SELECTED
          // if (select.has(chip.label)) {
          //   document
          //     .getElementsByClassName("filterButton")
          //     [i].classList.remove("filterButtonDisabled");
          // } else {
          //   document
          //     .getElementsByClassName("filterButton")
          //     [i].classList.add("filterButtonDisabled");
          // }
          addFilter(chip);
        }}
        commonButtonProps={{
          buttonClasses: "filterButton",
        }}
        select={select}
        data={currentData}
        // maxWidth={318}
        minWidth={220}
        height={90}
      />
    </div>
  );
};

export default Suggestions;
