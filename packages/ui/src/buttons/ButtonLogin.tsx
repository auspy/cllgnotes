"use client";
import { useSession } from "next-auth/react";
import UserAvatarMenu from "../avatar/UserAvatarMenu";
import LinkButton from "./LinkButton";

const ButtonLogin = () => {
  // const [loading, setLoading] = useState(false);
  const session: any = useSession();
  if (session.status == "authenticated") {
    return (
      <UserAvatarMenu
        {...session.data}
        username={
          session.data.user?.name || session.data.user?.username || "username"
        }
      />
    );
  }
  return <LinkButton text="Login" href="/auth" />;
};

export default ButtonLogin;
