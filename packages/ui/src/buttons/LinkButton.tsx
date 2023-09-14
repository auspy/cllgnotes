"use client";
import { LinkButtonProps } from "@cllgnotes/types";
import ButtonBlack from "./ButtonBlack";
import { useRouter } from "next/navigation";

const LinkButton = ({ text, href, ...rest }: LinkButtonProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(href);
  };
  return (
    <>
      <ButtonBlack
        {...rest}
        text={text}
        fontSize={14}
        height={49}
        onClick={handleClick}
      />
    </>
  );
};

export default LinkButton;
