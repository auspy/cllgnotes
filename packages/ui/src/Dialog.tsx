const Dialog = ({
  children,
  setShow,
  show,
  className,
  style,
}: React.PropsWithChildren & {
  setShow: any;
  show?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) => {
  if (typeof show == "boolean" && !show) return null;
  return (
    <div
      // onBlur={() => {
      //   setShow(false);
      // }}
      style={style}
      className={
        "card3 absolute w100 !p-1 scrollbar-x max-h-[200px] z-10 " + className
      }
    >
      {children}
    </div>
  );
};

export default Dialog;
