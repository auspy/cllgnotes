"use client";
import { useState } from "react";
import { Drawer, IconButton, CloseRounded, MenuRounded } from "../mui/mui";
import Navigation from "../header/Navigation";

const RightDrawer = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <IconButton
        className="flex md:hidden"
        aria-label="menu"
        color="inherit"
        onClick={toggleDrawer}
      >
        <MenuRounded color="inherit" />
      </IconButton>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            padding: 5,
            minWidth: 300,
          },
        }}
        anchor={"right"}
        open={open}
        onClose={toggleDrawer}
        elevation={30}
      >
        <IconButton
          color="inherit"
          style={{ position: "absolute", top: 15, right: 15, zIndex: 2 }}
          onClick={toggleDrawer}
        >
          <CloseRounded color="inherit" />
        </IconButton>
        <h4 className="upper semi12 mb20" style={{ opacity: 0.4 }}>
          Menu
        </h4>
        <Navigation gap={20} flexDir="column" />
      </Drawer>
    </>
  );
};

export default RightDrawer;
