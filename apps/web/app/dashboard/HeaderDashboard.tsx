import { Borders } from "@cllgnotes/types";
import Colors from "@cllgnotes/types/colors";
import { Logo, ButtonLogin, Navigation } from "ui";

const HeaderDashboard = () => {
  return (
    <>
      <div
        className="w100 frcsb"
        style={{
          position: "fixed",
          top: 0,
          height: 80,
          paddingInline: 30,
          zIndex: 3,
          backgroundColor: Colors.bg,
          borderBottom: Borders.lGrey,
        }}
      >
        <Logo />
        <Navigation
          data={[
            { text: "Dashboard", href: "/dashboard" },
            { text: "Create New Doc", href: "/dashboard/create-doc" },
          ]}
        />
        <ButtonLogin />
      </div>
    </>
  );
};

export default HeaderDashboard;
