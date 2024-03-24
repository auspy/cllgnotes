import { CommentType } from "@cllgnotes/types";
import { ButtonDropdown, CommentItem } from "ui";
import useServerSession from "./hooks/useServerSession";
import CommentsSearchBar from "./CommentsSearchBar";
import Link from "next/link";

const Comments = async ({
  projectId,
  searchParams,
}: {
  projectId: string;
  searchParams: any;
}) => {
  const comments: CommentType[] = [
    {
      comment: "This is a comment",
      page: 1,
      createdAt: new Date(),
    },
    {
      comment: "This is a comment",
      page: 1,
      createdAt: new Date(),
    },
    {
      comment: "This is a comment",
      page: 1,
      createdAt: new Date(),
    },
    {
      comment: "This is a comment",
      page: 1,
      createdAt: new Date(),
    },
    {
      comment: "This is a comment",
      page: 1,
      createdAt: new Date(),
    },
    {
      comment: "This is a comment",
      page: 1,
      createdAt: new Date(),
    },
    {
      comment: "This is a comment",
      page: 1,
      createdAt: new Date(),
    },
    {
      comment: "This is a comment",
      page: 1,
      createdAt: new Date(),
    },
    {
      comment: "This is a comment",
      page: 1,
      createdAt: new Date(),
    },
    {
      comment: "This is a comment",
      page: 1,
      createdAt: new Date(),
    },
    {
      comment: "This is a comment",
      page: 1,
      createdAt: new Date(),
    },
    {
      comment: "This is a comment",
      page: 1,
      createdAt: new Date(),
    },
  ];
  const session: any = await useServerSession();
  const sort = searchParams?.sort;
  const search = searchParams?.search;
  if (!session) {
    return <Link href="/auth">Login to continue</Link>;
  }
  const user = session?.user?._id;
  return (
    <>
      <div className="p-5 frc gap-[10px] sticky top-0 bg-gradient-to-b from-white ">
        <CommentsSearchBar />
        <ButtonDropdown />
      </div>
      <div className="px-5 flex flex-col ">
        <div className="flex  flex-col gap-[30px]">
          {comments.map((comment, index) => (
            <>
              <CommentItem key={index} {...comment} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
