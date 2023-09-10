"use client";
import IconButton from "../buttons/IconButton";
import { ViewListRounded, ViewComfyRounded } from "../mui/mui";
import { useState } from "react";

const ButtonGridIcon = () => {
  const [isGrid, setIsGrid] = useState<boolean>(false);
  const size = 18;
  return (
    <>
      <IconButton
        size={40}
        onClick={() => {
          setIsGrid(!isGrid);
        }}
        icon={
          isGrid ? (
            <ViewComfyRounded
              style={{ height: size, width: size }}
              color="inherit"
            />
          ) : (
            <ViewListRounded
              style={{ height: size, width: size }}
              color="inherit"
            />
          )
        }
      />
    </>
  );
};

export default ButtonGridIcon;
