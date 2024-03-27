import { CommentType } from "@cllgnotes/types";

export const createCommentKey = ({
  page,
  x,
  y,
  comment,
}:
  | { page: number; x: number; y: number; comment?: undefined }
  | {
      comment: CommentType;
      page?: undefined;
      x?: undefined;
      y?: undefined;
    }) => {
  if (comment) {
    if (!comment.page || !comment.x || !comment.y) {
      return null;
    }
    return `${comment.page}_${comment.x}_${comment.y}`;
  }
  if (!page && x && y) {
    return null;
  }
  return `${page}_${x}_${y}`;
};
