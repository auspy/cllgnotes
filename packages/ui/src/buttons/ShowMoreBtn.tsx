"use client";
import ButtonBlack from "./ButtonBlack";

const ShowMoreBtn = () => {
  return (
    <>
      <ButtonBlack
        onClick={() => {
          const testiGrad = document?.getElementById("testiGrad");
          if (testiGrad) {
            testiGrad.style.display = "none";
            testiGrad.parentElement!.style.maxHeight = "unset";
          }
        }}
        text="Show more +"
      />
    </>
  );
};

export default ShowMoreBtn;
