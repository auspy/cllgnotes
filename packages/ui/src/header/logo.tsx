import Colors from "@cllgnotes/types/colors";
import Link from "next/link";

const Logo = ({
  fontSize = 24,
  color = "dark",
}: {
  fontSize?: 24 | 36;
  color?: "white" | "dark";
}) => {
  return (
    <>
      <Link
        href={"/"}
        className="hover"
        style={{ fontSize: fontSize, color: Colors[color] }}
        id="logo"
      >
        Cllgnotes.com
      </Link>
    </>
  );
};
export default Logo;
