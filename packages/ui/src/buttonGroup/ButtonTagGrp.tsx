"use client";
import { useState } from "react";
import { Chip, ListItem } from "../mui/mui";
interface ChipData {
  key: number;
  label: string;
}

const ButtonTagGrp = () => {
  const [chipData, setChipData] = useState<readonly ChipData[]>([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
  return (
    <div className="frc w100" style={{ maxWidth: "50%" }}>
      {chipData.map((data) => {
        let icon;

        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </div>
  );
};

export default ButtonTagGrp;
