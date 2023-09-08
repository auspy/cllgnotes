import { NavigationProps } from "@cllgnotes/types/types.header";
import Link from "next/link";
import { Text } from "ui";
const Navigation = ({ gap = 40, data }: NavigationProps) => {
  return (
    <div className="frcsb" style={{ columnGap: gap }}>
      {data.map(({ href, text }, index) => (
        <Link key={index + href} href={href}>
          <Text text={text} type="medi14" textTransform="uppercase" />
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
