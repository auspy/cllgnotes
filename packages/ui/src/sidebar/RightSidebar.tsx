const RightSidebar = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className="scrollbar-x overflow-scroll border-l border-solid border-dark fixed top-0 h-full max-h-screen right-0 w-[360px] bg-white"
      style={{
        boxShadow: "var(--shadow-box4)",
      }}
    >
      {children}
    </div>
  );
};

export default RightSidebar;
