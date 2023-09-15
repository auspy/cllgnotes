"use client";
import { useRouter } from "next/navigation";

type LinkCardWrapperProps = React.PropsWithChildren & {
  href: string;
};
const LinkWrapper = ({ href, children }: LinkCardWrapperProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(href);
      }}
      className="hover"
    >
      {children}
    </div>
  );
};

export default LinkWrapper;
