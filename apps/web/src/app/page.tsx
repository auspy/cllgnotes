import { log, logger } from "logger";
import { Button, Header } from "ui";
import Logo from "ui/logo";

export default function Page(): JSX.Element {
  log("Hello World");
  return (
    <>
      <Header text="Web" />
      <Button />
      <Logo />
    </>
  );
}
