"use client";
import { atomUserName } from "@cllgnotes/lib";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserAvatarMenu, LinkButton } from "ui";

const ButtonLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useRecoilState(atomUserName);
  // console.log(username, "is the username in button login");
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUsername(JSON.parse(userData));
    }
    setLoading(false);
  }, []);
  if (username.username) {
    return <UserAvatarMenu username={username.username || "username"} />;
  }
  return <LinkButton disabled={loading} text="Login" href="/auth" />;
};

export default ButtonLogin;
