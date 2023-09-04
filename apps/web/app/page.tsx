import { log, logger } from "logger";
import { Button, Header, Logo } from "ui";

export default function Page(): JSX.Element {
  log("Hello World");
  return (
    <>
      <div className="p-[100px] text-zinc-500 ps-50 ml-50 mb-50 m-100 test bg-blue-500">
        hello it is
      </div>
      <Header text="Web" />
      <Button />
      <Logo />
    </>
  );
}
