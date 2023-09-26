"use client";
import { animateInViewPort } from "@cllgnotes/lib";
import { AnimateElementProps } from "@cllgnotes/types";
import { useEffect } from "react";

type AnimateWrapperProps = React.PropsWithChildren & AnimateElementProps;
const AnimateWrapper = ({ children, ...props }: AnimateWrapperProps) => {
  useEffect(() => {
    const unsubscribe = animateInViewPort({
      ...props,
    });
    return () => unsubscribe();
  }, []);
  return <>{children}</>;
};

export default AnimateWrapper;
