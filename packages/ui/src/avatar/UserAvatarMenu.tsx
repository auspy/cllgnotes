"use client";
import { useState } from "react";
import { Avatar, CircularProgress } from "@mui/material";
import Colors from "@cllgnotes/types/colors";
import { Session } from "next-auth";
import Text from "../text/Text";
import AccountMenu from "../menu/AccountMenu";

type UserAvatarMenuProps = Session & {
  username: string;
};

const UserAvatarMenu = ({ username, user }: UserAvatarMenuProps) => {
  const [clicked, setCliked] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (clicked) return;
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  return (
    <div>
      <Avatar
        onClick={handleClick}
        style={{
          height: 40,
          width: 40,
          backgroundColor: Colors.white,
          border: "1px solid var(--dark)",
          borderRadius: "50%",
          color: "var(--dark)",
        }}
        src={(!clicked && user?.image) || ""}
      >
        {clicked ? (
          <CircularProgress color="inherit" size={14} />
        ) : (
          <Text type="semi16" textTransform="uppercase">
            {username[0]}
          </Text>
        )}
      </Avatar>
      <AccountMenu
        setAnchorEl={setAnchorEl}
        anchorEl={anchorEl}
        clicked={clicked}
        setClicked={setCliked}
      />
    </div>
  );
};

export default UserAvatarMenu;
