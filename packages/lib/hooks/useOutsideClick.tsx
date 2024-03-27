"use client";
import { useEffect, useRef } from "react";
import { throttle } from "../helpers";

const UseOutsideClick = ({
  setShow,
  dependencies = [],
  ref,
}: {
  ref?: React.RefObject<HTMLDivElement>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  dependencies?: any[];
}) => {
  const childRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const container = ref ? ref.current : childRef.current?.parentElement;
    const handleOutsideClick = throttle((event: any) => {
      console.log("Container", container);
      console.log("Event", event.target, container?.contains(event.target));
      if (container && !container.contains(event.target)) {
        console.log("Clicked outside");
        setShow(false); // Clicked outside, close the box
      }
    }, 300);

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [...dependencies, childRef.current]); // Empty dependency array ensures this effect runs only once
  return <div ref={childRef} />;
};

export default UseOutsideClick;
