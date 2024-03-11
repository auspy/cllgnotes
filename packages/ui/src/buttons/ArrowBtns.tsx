"use client";
import { useEffect, useState } from "react";
import IconButton from "./IconButton";
import { ChevronRightRounded, ChevronLeftRounded } from "../mui/mui";
const ArrowBtns = ({ id }: { id: string }) => {
  const [atEnd, setAtEnd] = useState<"left" | "right" | null>("left");
  const isAtLeftEnd = atEnd == "left";
  const isAtRightEnd = atEnd == "right";
  useEffect(() => {
    const ele = document.getElementById(id);
    if (!ele) return;
    const handleScroll = (e: any) => {
      const el = e.target;
      if (el?.scrollLeft == 0) {
        setAtEnd("left");
      } else if (
        el?.scrollWidth &&
        el?.scrollLeft == el?.scrollWidth - el?.clientWidth
      ) {
        setAtEnd("right");
      } else {
        setAtEnd(null);
      }
    };
    ele.addEventListener("scroll", handleScroll);

    return () => {
      ele.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="mr30">
        <IconButton
          onClick={() => {
            if (document?.getElementById(id)) {
              document.getElementById(id)!.scrollLeft += 320;
            }
          }}
          color={isAtRightEnd ? "grey" : "white"}
          icon={<ChevronRightRounded style={{ height: 30, width: 30 }} />}
        />
        <IconButton
          onClick={() => {
            if (document?.getElementById(id)) {
              document.getElementById(id)!.scrollLeft -= 320;
            }
          }}
          color={isAtLeftEnd ? "grey" : "white"}
          buttonClasses="my-[25px]"
          icon={<ChevronLeftRounded style={{ height: 30, width: 30 }} />}
        />
      </div>
    </>
  );
};

export default ArrowBtns;
