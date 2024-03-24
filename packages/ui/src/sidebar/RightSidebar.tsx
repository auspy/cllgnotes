const RightSidebar = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className="scrollbar-x overflow-scroll border-t lg:border-l border-solid border-dark relative z-20 lg:fixed w-screen lg:top-0 h-full max-h-screen right-0 lg:w-[360px] bg-white"
      style={{
        boxShadow: "var(--shadow-box4)",
      }}
    >
      {children}
    </div>
  );
};

export default RightSidebar;
