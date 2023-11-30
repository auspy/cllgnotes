"use client";
import { useRouter } from "next/navigation";

type LinkCardWrapperProps = React.PropsWithChildren & {
  href: string;
  className?: string;
};
const LinkWrapper = ({ href, children, className }: LinkCardWrapperProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(href);
      }}
      className={`hover w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default LinkWrapper;
