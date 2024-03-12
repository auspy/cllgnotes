import { ButtonProps } from "@cllgnotes/types";
import Button from "./Button";

const ButtonSuggest = (props: ButtonProps) => {
  return (
    <>
      <Button {...props} height={120} width={"100%"} text={props.text} />
    </>
  );
};

export default ButtonSuggest;
