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

export const dummyFilterList: FilterCheckboxListProps = {
  Year: ["Fresher", "Sophomore", "Junior", "Senior"],
  Years: ["Fresher", "Sophomore", "Junior", "Senior"],
  Yearss: ["Fresher", "Sophomore", "Junior", "Senior"],
};
