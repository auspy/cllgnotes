"use client";

import { useSuspenseQuery } from "@apollo/client";
import { COMMENTS } from "./graphql/gql";
import { useSession } from "next-auth/react";

const getComments = ({
  projectId,
  skip,
}: {
  projectId: string;
  skip?: boolean;
}) => {
  const session: any = useSession();
  const user = session.data?.user?._id;
  const opts = useSuspenseQuery(COMMENTS, {
    variables: {
      projectId,
      userId: user,
    },
    skip: !projectId || !user || skip,
  });
  return opts;
};

export default getComments;
