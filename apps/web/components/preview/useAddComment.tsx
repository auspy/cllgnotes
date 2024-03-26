"use client";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "@/db/graphql/gql";
import { CommentType } from "@cllgnotes/types";

const useAddComment = () => {
  const [addComment, opts] = useMutation(ADD_COMMENT);
  const handleAddComment = async (comment: CommentType) => {
    return await addComment({
      variables: {
        input: comment,
      },
      onCompleted: (data) => {
        console.log("Comment added", data);
        return data;
      },
      onError: (error) => {
        console.error("Error adding comment", error);
      },
    });
  };
  return { addComment: handleAddComment, ...opts };
};

export default useAddComment;
