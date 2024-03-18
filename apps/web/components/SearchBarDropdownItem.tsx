import { TestType } from "@cllgnotes/types";
import Link from "next/link";
import { CardDetailsText, Text } from "ui";

const SearchBarDropdownItem = ({
  course,
  department,
  subject,
  _id,
  year,
  testType,
  index,
}: {
  course: { name: string };
  department: { name: string };
  subject: { name: string };
  _id: string;
  year: number;
  testType: TestType;
  index: number;
}) => {
  return (
    <Link
      href={`/notes/${_id}`}
      className=" hover:!opacity-100  gap-y-4 flex flex-col w100"
    >
      {index != 0 && <hr />}
      <div className="hover:bg-lGrey2 rounded-lg p-1">
        <CardDetailsText
          _id={_id}
          course={course}
          subject={subject}
          year={year}
          testType={testType}
          allowWrap={true}
        />
      </div>
    </Link>
  );
};

export default SearchBarDropdownItem;
