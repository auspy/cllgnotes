"use client";
import { CommentType } from "@cllgnotes/types";
import Text from "../text/Text";
import { createCommentKey } from "@cllgnotes/lib";

const CommentItem = ({
  page,
  x,
  y,
  text,
  createdAt,
  setActive,
}: CommentType & { setActive: (id: string) => void }) => {
  const key = createCommentKey({ x, y, page });
  const time =
    createdAt instanceof Date
      ? createdAt
      : isNaN(new Date(createdAt).getTime())
      ? new Date(parseInt(createdAt))
      : new Date(createdAt);
  console.log("CommentItem", page, text, time);
  if (!page || !text) {
    return null;
  }
  return (
    <div
      onClick={() => {
        setActive(key || "");
      }}
      className="border-b hover w100 border-dashed border-dark pb-[15px]  "
    >
      <div className="frcsb">
        <Text type="semi12" color="dark">
          Page #{page}
        </Text>
        {time instanceof Date && (
          <Text type="medi12" color="dGrey">
            {time?.toLocaleTimeString()} - {time?.toLocaleDateString()}
          </Text>
        )}
      </div>
      <Text type="medi14" color="dark">
        {text}
      </Text>
    </div>
  );
};

export default CommentItem;
