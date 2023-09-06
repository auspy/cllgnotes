import { log, logger } from "logger";
import { Button, Header, Logo } from "ui";
import { CONSTANT_TEST } from "@cllgnotes/lib/constants";
import colors from "@cllgnotes/lib/colors";

export default function Page(): JSX.Element {
  console.log("Hello World", Object.values(colors));
  log(Object.keys(colors));
  log("Hello World" + CONSTANT_TEST);
  return (
    <>
      <div
        className="p-[100px] test text-zinc-500 ps-50 ml-50 mb-50 m-100 test bg-blue-500"
        style={{
          backgroundColor: colors.blue,
        }}
      >
        hello it is
      </div>
      <Header text="Web" />
      <Button />
      <Logo />
    </>
  );
}
