import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./route";

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
