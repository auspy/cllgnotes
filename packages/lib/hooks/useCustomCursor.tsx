"use client";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { atomPdf } from "../state";

const useCustomCursor = ({
  dependencies,
  show = false,
  cursorId,
  container,
}: {
  dependencies?: any[];
  show?: boolean;
  cursorId: string | React.RefObject<HTMLElement>;
  container: string | React.RefObject<HTMLElement>;
}) => {
  // need a div to act as a cursor
  // need the div in which the cursor will be used
  const pdfState = useRecoilValue(atomPdf);
  useEffect(() => {
    console.log("useCustomCursor", show);
    const cont =
      typeof container == "string"
        ? document.getElementById(container)
        : container && container.current;
    const cursor =
      typeof cursorId == "string"
        ? document.getElementById(cursorId)
        : cursorId && cursorId.current;
    if (!cont || !cursor) {
      return;
    }
    // ? not using throttle as it causes blurry effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = cont.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const rotate = (pdfState.rotate * Math.PI) / 180;
      const x =
        (mouseX - cont.offsetWidth / 2) * Math.cos(-rotate) -
        (mouseY - cont.offsetHeight / 2) * Math.sin(-rotate) +
        cont.offsetWidth / 2;
      const y =
        (mouseX - cont.offsetWidth / 2) * Math.sin(-rotate) +
        (mouseY - cont.offsetHeight / 2) * Math.cos(-rotate) +
        cont.offsetHeight / 2;
      cursor.style.left = x + "px";
      cursor.style.top = y + "px";
      cursor.style.display = "block";
      //   if hover on canvas then show the cursor
    };
    const handleMouseLeave = () => {
      cursor.style.display = "none";
    };
    if (show) {
      cont.style.cursor = "none";
      cont.addEventListener("mousemove", handleMouseMove);
    } else {
      cont.style.cursor = "auto";
      cont.removeEventListener("mousemove", handleMouseMove);
    }
    cont.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      cont.removeEventListener("mousemove", handleMouseMove);
      cont.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [dependencies]);
  return null;
};

export default useCustomCursor;
