"use client";
import { CommentType } from "@cllgnotes/types";
import { ButtonDropdown, CommentItem, Text } from "ui";
import CommentsSearchBar from "./CommentsSearchBar";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { atomPdf, createCommentKey } from "@cllgnotes/lib";
import { useSession } from "next-auth/react";
import getComments from "@/db/getComments";
import { useEffect } from "react";

const Comments = ({
  projectId,
  searchParams,
}: {
  projectId: string;
  searchParams: any;
}) => {
  const [pdfState, setPdfState] = useRecoilState(atomPdf);
  // const comments: CommentType[] = pdfState.comments;
  // load initial comments using api in separate component
  const comments = pdfState.comments;
  const { data }: any = getComments({
    projectId,
    skip: Array.isArray(comments),
  });
  const commentsFromApi = data?.Comments;
  useEffect(() => {
    if (Array.isArray(commentsFromApi)) {
      console.log("Comments from api", commentsFromApi);
      const convertedComments = (commentsFromApi as CommentType[]).reduce(
        (acc: any, comment: CommentType) => {
          console.log("Comment", comment);
          const key = createCommentKey(comment);
          if (key) {
            return {
              ...acc,
              [comment.page]: {
                ...acc[comment.page],
                [key]: comment,
              },
            };
          }
        },
        {}
      );
      setPdfState((prev) => ({ ...prev, comments: convertedComments }));
    }
  }, [commentsFromApi]);
  const handleActiveComment = (id: string) => {
    setPdfState((prev) => ({ ...prev, activeComment: id }));
  };
  const session: any = useSession();
  const sort = pdfState.sort;
  const search = pdfState.search;
  if (!session) {
    return <Link href="/auth">Login to continue</Link>;
  }
  const user = session?.user?._id;
  // console.log("Comments", comments);
  return (
    <>
      <div className="p-5 frc gap-[10px] sticky top-0 bg-gradient-to-b from-white ">
        <CommentsSearchBar />
        <ButtonDropdown />
      </div>
      <div className="px-5 flex flex-col ">
        <div className="flex  flex-col gap-[30px]">
          {Object.keys(comments).length === 0 ? (
            <Text type="medi14" color="lGrey" textAlign="left">
              Your comments will be shown here
            </Text>
          ) : (
            Object.keys(comments).map((pageNum, index) =>
              Object.values(comments[pageNum as unknown as number])
                .filter((comment: CommentType) => {
                  if (search) {
                    return (
                      typeof comment == "object" &&
                      comment?.text?.match(
                        new RegExp(search.split(" ").join("|"), "i")
                      )
                    );
                  }
                  return true;
                })
                .sort((a, b) => {
                  // if (!(a && b)) {
                  //   return 0;
                  // }
                  if (sort == "page dsc") {
                    return Number(b.page) - Number(a.page);
                  } else if (sort == "date asc") {
                    return (
                      new Date(
                        typeof a.createdAt == "string"
                          ? parseInt(a.createdAt)
                          : a.createdAt
                      ).getTime() -
                      new Date(
                        typeof b.createdAt == "string"
                          ? parseInt(b.createdAt)
                          : b.createdAt
                      ).getTime()
                    );
                  } else if (sort == "date dsc") {
                    return (
                      new Date(
                        typeof b.createdAt == "string"
                          ? parseInt(b.createdAt)
                          : b.createdAt
                      ).getTime() -
                      new Date(
                        typeof a.createdAt == "string"
                          ? parseInt(a.createdAt)
                          : a.createdAt
                      ).getTime()
                    );
                  }
                  return Number(a.page) - Number(b.page);
                })
                .map((commentKey, i) => (
                  <CommentItem
                    setActive={handleActiveComment}
                    key={i}
                    {...commentKey}
                  />
                ))
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Comments;
