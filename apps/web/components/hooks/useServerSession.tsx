import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
const useServerSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export default useServerSession;
