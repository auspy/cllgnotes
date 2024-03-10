"use client";
import { authLogout } from "@/api/auth/auth";
import { useRouter } from "next/navigation";
import { ContextAuthLogout } from "@cllgnotes/lib";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@/api/graphql/gql";
import { useContext } from "react";
import { signOut, useSession } from "next-auth/react";

export const AuthWrapper = ({ children }: React.PropsWithChildren) => {
  const { data }: any = useSession();
  const isAdmin = data?.user?.role == "ADMIN";
  const router = useRouter();
  const [logout, { client }] = useMutation(LOGOUT);
  const logoutFunc = (changePage: boolean = isAdmin) => {
    signOut({
      redirect: changePage,
    });
    authLogout({
      router,
      localStorage,
      sessionStorage,
      logoutApi: logout,
      changePage,
      client,
    });
  };
  return (
    <ContextAuthLogout.Provider
      value={(changePage?: boolean) => logoutFunc(changePage)}
    >
      {children as any}
    </ContextAuthLogout.Provider>
  );
};

const useLogout = () => {
  const logout = useContext(ContextAuthLogout as any);
  return logout;
};

export default useLogout;
