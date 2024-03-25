"use client";
import { CommentType } from "@cllgnotes/types";
import { ButtonDropdown, CommentItem } from "ui";
import CommentsSearchBar from "./CommentsSearchBar";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { atomPdf } from "@cllgnotes/lib";
import { useSession } from "next-auth/react";

const Comments = ({
  projectId,
  searchParams,
}: {
  projectId: string;
  searchParams: any;
}) => {
  const pdfState = useRecoilValue(atomPdf);
  // const comments: CommentType[] = pdfState.comments;
  // load initial comments using api in separate component
  const comments = pdfState.comments;
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
          {Object.keys(comments).map((pageNum, index) =>
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
                if (!(a && b && typeof a == "object" && typeof b == "object")) {
                  return 0;
                }
                if (sort == "page dsc") {
                  return Number(b.page) - Number(a.page);
                } else if (sort == "date asc") {
                  return (
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                  );
                } else if (sort == "date dsc") {
                  return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                  );
                }
                return Number(a.page) - Number(b.page);
              })
              .map((commentKey, i) => <CommentItem key={i} {...commentKey} />)
          )}
        </div>
      </div>
    </>
  );
};

export default Comments;
