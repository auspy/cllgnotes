import { log, logger } from "logger";
import { Button, Header, Logo } from "ui";
import { CONSTANT_TEST } from "@cllgnotes/lib/constants";

export default function Page(): JSX.Element {
  log("Hello World" + CONSTANT_TEST);
  return (
    <>
      <div className="p-[100px] test text-zinc-500 ps-50 ml-50 mb-50 m-100 test bg-blue-500">
        hello it is
      </div>
      <Header text="Web" />
      <Button />
      <Logo />
    </>
  );
}
