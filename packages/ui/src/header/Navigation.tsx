import { dummyNavData } from "@cllgnotes/lib/dummyData";
import { NavigationProps } from "@cllgnotes/types/types.header";
import Link from "next/link";
import { Text } from "ui";
const Navigation = ({
  gap = 40,
  data = dummyNavData,
  textTransform,
  color,
}: NavigationProps) => {
  return (
    <div className="frcsb" style={{ columnGap: gap }}>
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
