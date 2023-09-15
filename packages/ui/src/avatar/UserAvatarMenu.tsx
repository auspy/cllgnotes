"use client";
import { useState } from "react";
import { AccountMenu } from "ui";
import { CircularProgress } from "@mui/material";
import Colors from "@cllgnotes/types/colors";

const UserAvatarMenu = ({ username }: { username: string }) => {
  const [clicked, setCliked] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  return (
    <div>
      <button
        style={{
          height: 40,
          width: 40,
          backgroundColor: Colors.white,
          border: "1px solid var(--dark)",
          borderRadius: "50%",
          color: "var(--dark)",
        }}
        onClick={handleClick}
        className="upper semi16 gcc"
      >
        {clicked ? <CircularProgress color="inherit" size={14} /> : username[0]}
      </button>
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
