import { FilterCheckboxListProps } from "@cllgnotes/types";
import { ButtonProps } from "@cllgnotes/types/types.buttons";
export const dummyFilterGrpsDocType: ButtonProps[] = [
  {
    text: "Notes",
    icon: <img src="/icons/notes.png" alt="notes" height={60} width={60} />,
  },
  {
    text: "Papers",
    icon: <img src="/icons/papers.png" alt="papers" height={60} width={60} />,
  },
  {
    text: "Presentations",
    icon: (
      <img
        src="/icons/presentation.png"
        alt="presentation"
        height={60}
        width={60}
      />
    ),
  },
];

export const dummyFilterGrpsSubject: ButtonProps[] = [
  {
    text: "Maths",
  },
  {
    text: "Physics",
  },
  {
    text: "Chemistry",
  },
  {
    text: "Biology",
  },
  {
    text: "Social Science",
  },
  {
    text: "Computer Science",
  },
  {
    text: "English",
  },
  {
    text: "Envirenmental Science",
  },
];

export const semsFilter = [
  { text: "1" },
  { text: "2" },
  { text: "3" },
  { text: "4" },
  { text: "5" },
  { text: "6" },
  { text: "7" },
  { text: "8" },
];

export const yearsFilter = [
  { text: "2020" },
  { text: "2021" },
  { text: "2022" },
  { text: "2023" },
  { text: "2024" },
  { text: "2025" },
  { text: "2026" },
  { text: "2027" },
  { text: "2028" },
];

export const universitysFilter = [
  { text: "SRM University" },
  // You can add more universities in a similar fashion if needed
];

export const sems = [1, 2, 3, 4, 5, 6, 7, 8];
export const Years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028];
export const Universitys = ["SRM University"];

export const dummyFilterSteps = [
  { title: "What are you searching for?", data: dummyFilterGrpsDocType },
  { title: "Which year?", data: yearsFilter },
  { title: "Semester?", data: semsFilter },
  { title: "University?", data: universitysFilter },
];

export const dummyFilterList: FilterCheckboxListProps = {
  Type: dummyFilterGrpsDocType,
  University: universitysFilter,
  Year: yearsFilter,
  Semester: semsFilter,
};
