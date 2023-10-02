"use client";
import { UserAvatarMenu, LinkButton } from "ui";
import { useSession } from "next-auth/react";

const ButtonLogin = () => {
  // const [loading, setLoading] = useState(false);
  const session = useSession();
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
