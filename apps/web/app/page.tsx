import { log, logger } from "logger";
import { Button } from "ui";
import { CONSTANT_TEST } from "@cllgnotes/lib/constants";
import colors from "@cllgnotes/lib/colors";

export default function Page(): JSX.Element {
  console.log("Hello World", Object.values(colors));
  log(Object.keys(colors));
  log("Hello World" + CONSTANT_TEST);
  return (
    <>
      <div>
        <Button text="hello" />
      </div>
      <h1>wow</h1>
    </>
  );
}
