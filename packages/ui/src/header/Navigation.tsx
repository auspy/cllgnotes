import { dummyNavData } from "@cllgnotes/lib/dummyData";
import { NavigationProps } from "@cllgnotes/types/types.header";
import Link from "next/link";
import Text from "../text/Text";
const Navigation = ({
  gap = 40,
  data = dummyNavData,
  textTransform,
  color,
  flexDir = "row",
}: NavigationProps) => {
  return (
    <div
      className={`${flexDir == "row" ? "frcsb flex-col sm:flex-row" : "fcfs"} `}
      style={{ gap: gap }}
    >
      {data.map(({ href, text }, index) => (
        <Link key={index + href} href={href}>
          <Text
            text={text}
            type="medi14"
            color={color || "dark"}
            textTransform={textTransform || "uppercase"}
          />
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
