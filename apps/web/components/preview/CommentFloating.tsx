"use client";
import { createCommentKey, UseOutsideClick } from "@cllgnotes/lib";
import { CommentType } from "@cllgnotes/types";
import { Text } from "ui";

const CommentFloating = ({
  text,
  x,
  y,
  active,
  setActive,
  page,
}: CommentType & {
  active?: string;
  setActive: (id: string) => void;
}) => {
  const key = createCommentKey({ x, y, page });
  const isActive = active === key;
  if (!isActive) {
    return (
      <button
        style={{
          top: y || 0,
          left: x || 0,
        }}
        className="p-2 absolute hover:!opacity-100 rounded-full"
        onClick={() => {
          if (!key) {
            console.error("Error creating comment key");
            return;
          }
          setActive(key);
        }}
      >
        <div
          style={{
            boxShadow: "1px 1px 0px 0px #141414",
          }}
          className="group h-[20px] hover:h-auto hover:max-h-[300px] box-border hover:box-content scrollbar-hide hover:p-4 hover:w-[200px] hover:transition-[width]  w-[20px] rounded-full hover:rounded-[5px] bg-lYellow border shadow-md hover:z-30 border-dark border-solid  z-20"
        >
          <Text type="medi14" textClass="text-left group-hover:block hidden">
            {text}
          </Text>
        </div>
      </button>
    );
  }
  return (
    <div
      style={{
        position: "absolute",
        top: y || 0,
        left: x || 0,
      }}
      className="z-30 max-w-[200px] max-h-[300px] overflow-y-scroll scrollbar-hide bg-white p-2 border border-dark border-solid  shadow-lg rounded-[5px]"
    >
      {isActive && (
        <UseOutsideClick
          setShow={() => {
            setActive("");
          }}
        />
      )}
      <Text type="medi14" textClass="text-left">
        {text}
      </Text>
    </div>
  );
};

export default CommentFloating;
