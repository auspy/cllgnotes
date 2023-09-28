"use client";
import { authLogout } from "@/api/auth/auth";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { atomUserName, ContextAuthLogout } from "@cllgnotes/lib";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@/api/graphql/gql";
import { useContext } from "react";

export const AuthWrapper = ({ children }: React.PropsWithChildren) => {
  const [user, setUserState] = useRecoilState(atomUserName);
  const isAdmin = user.role === "ADMIN";
  const router = useRouter();
  const [logout, { client }] = useMutation(LOGOUT);
  const logoutFunc = (changePage: boolean = isAdmin) => {
    authLogout({
      router,
      setUsername: setUserState,
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
      {children}
    </ContextAuthLogout.Provider>
  );
};

const useLogout = () => {
  const logout = useContext(ContextAuthLogout);
  return logout;
};

export default useLogout;
