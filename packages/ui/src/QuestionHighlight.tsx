import { Highlight } from "@cllgnotes/types";
import { memo } from "react";
import HighlightText from "./HighlightText";

const QuestionHighlight = ({
  highlights,
  questionsCount = 1,
}: {
  highlights: Highlight[];
  questionsCount: number;
}) => {
  const getQuestions = (highlights: Highlight[]) => {
    const questions: Highlight["texts"][] = [];
    let count = 0;
    if (!Array.isArray(highlights)) return questions;
    for (const highlight of highlights) {
      if (highlight.path.includes("questions")) {
        const ques = highlight.texts;
        questions.push(ques);
        count++;
      }
      if (count >= questionsCount) {
        return questions;
      }
    }
    return questions;
  };
  const questions = getQuestions(highlights);
  console.log("questions", questions);
  return (
    <div className="flex flex-col gap-1">
      {questions.map((question, index) => (
        <p key={index} className=" regu12">
          <span className=""> q).</span> <HighlightText texts={question} />
        </p>
      ))}
    </div>
  );
};

export default memo(QuestionHighlight);
