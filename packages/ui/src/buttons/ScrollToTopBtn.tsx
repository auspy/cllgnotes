"use client";
import { ButtonFontSizes } from "@cllgnotes/types";
import Button from "./Button";
import { ChevronRightRounded } from "../mui/mui";

const ScrollToTopBtn = () => {
  function scrollToTop() {
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <>
      <Button
        buttonClasses="mt30 shadow-box5"
        buttonStyles={{}}
        text="purchase to read"
        fontSize={ButtonFontSizes.large}
        height={70}
        onClick={scrollToTop}
        icon={
          <ChevronRightRounded
            color="inherit"
            sx={{
              fontSize: 32,
            }}
            style={{ strokeWidth: 5 }}
          />
        }
      />
    </>
  );
};

export default ScrollToTopBtn;
