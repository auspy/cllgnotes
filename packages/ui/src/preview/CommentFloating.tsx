"use client";
import { createCommentKey } from "@cllgnotes/lib";
import { CommentType } from "@cllgnotes/types";

const CommentFloating = ({
  text,
  x,
  y,
  active,
  setActive,
  page,
}: CommentType & {
  active?: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const key = createCommentKey({ x, y, page });
  const isActive = active === key;
  console.log("Active", isActive, key, active);
  if (!isActive) {
    return (
      <button
        style={{
          position: "absolute",
          top: y || 0,
          left: x || 0,
          width: "20px",
          height: "20px",
        }}
        className="bg-green z-20"
        onClick={() => {
          if (!key) {
            console.error("Error creating comment key");
            return;
          }
          setActive(key);
        }}
      ></button>
    );
  }
  return (
    <div
      onBlur={() => {
        setActive("");
      }}
      style={{
        position: "absolute",
        top: y || 0,
        left: x || 0,
        width: "20px",
        height: "20px",
      }}
      className="bg-bg z-20"
    >
      {text}
    </div>
  );
};

export default CommentFloating;
