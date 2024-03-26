"use client";
import { useEffect } from "react";
import { debounce } from "../helpers";

const useKeyPress = ({
  dependencies,
  key,
}: {
  dependencies: any[];
  key: Record<string, { func: () => void; shiftKey?: boolean }>;
}) => {
  useEffect(() => {
    if (!(key && typeof key == "object" && Object.keys(key).length > 0)) {
      return;
    }
    const handleKeyDown = debounce((e: KeyboardEvent) => {
      const selectedKey = key[e.key];
      if (
        selectedKey &&
        (selectedKey.shiftKey ? e.shiftKey : !e.shiftKey) &&
        !e.ctrlKey &&
        !e.altKey &&
        e.target instanceof HTMLElement &&
        e.target.tagName !== "INPUT"
      ) {
        console.log("comment key down");
        if (selectedKey.func instanceof Function) {
          selectedKey.func();
        }
      }
    }, 300);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [...dependencies]);
  return null;
};

export default useKeyPress;
