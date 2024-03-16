import { AnimateElementProps } from "@cllgnotes/types";
import { throttle } from "./throttle";

export const animateInViewPort = ({
  elementId,
  animation,
  duration,
}: AnimateElementProps) => {
  const elements = document.getElementsByClassName(elementId);

  if (!(elements && elements.length > 0)) return () => {};

  const elementsArray = Array.from(elements); // Convert HTMLCollection to an array

  const scrollHandler = throttle(() => {
    for (const element of elementsArray) {
      if (element instanceof HTMLElement) {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        const isVisible =
          elementTop >= 0 && window.innerHeight > elementTop - elementBottom
            ? elementBottom - (elementBottom - elementTop) / 2 <=
              window.innerHeight
            : true;

        if (isVisible) {
          element.classList.add(animation);
          if (duration) {
            element.style.animationDuration = `${duration}ms`;
          }
        }
      }
    }
  }, 300);

  window.addEventListener("scroll", scrollHandler);

  // Return a function to remove the event listener when it's no longer needed
  return () => {
    window.removeEventListener("scroll", scrollHandler);
  };
};
