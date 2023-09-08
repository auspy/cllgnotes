import Colors from "@cllgnotes/types/colors";

const Logo = ({
  fontSize = 24,
  color = "dark",
}: {
  fontSize?: 24 | 36;
  color?: "white" | "dark";
}) => {
  return (
    <>
      <p style={{ fontSize: fontSize, color: Colors[color] }} id="logo">
        Cllgnotes.com
      </p>
    </>
  );
};
export default Logo;
