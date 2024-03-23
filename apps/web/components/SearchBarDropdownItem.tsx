import { Highlight, TestType } from "@cllgnotes/types";
import { CardDetailsText, LinkWrapper, QuestionHighlight } from "ui";

const SearchBarDropdownItem = ({
  course,
  department,
  subject,
  _id,
  year,
  testType,
  index,
  highlights,
}: {
  course: { name: string };
  department: { name: string };
  subject: { name: string };
  _id: string;
  year: number;
  testType: TestType;
  index: number;
  highlights: Highlight[];
}) => {
  return (
    <LinkWrapper
      href={`/notes/${_id}`}
      className=" hover:!opacity-100     flex flex-col w100"
    >
      {index != 0 && <hr />}
      <div className="rounded-lg p-1 my-4 hover:bg-lGrey2 flex flex-col gap-y-2">
        <div className=" ">
          <CardDetailsText
            _id={_id}
            // highlights={highlights}
            course={course}
            subject={subject}
            year={year}
            testType={testType}
            allowWrap={true}
          />
        </div>
        <QuestionHighlight highlights={highlights} questionsCount={3} />
      </div>
    </LinkWrapper>
  );
};

export default SearchBarDropdownItem;
