"use client";
import { dummyLeftMenuItems } from "@cllgnotes/lib";
import { useContext, useState } from "react";
import { LeftMenuItemProps } from "@cllgnotes/types";
import HeaderDashboard from "./HeaderDashboard";
import { ContextDeviceType } from "@cllgnotes/lib";
import { LoginToContinue } from "ui";
import { useSession } from "next-auth/react";

interface DashLayoutProps extends React.PropsWithChildren {}
const DashLayout = ({ children }: DashLayoutProps) => {
  const [active, setActive] = useState<string>("Courses");
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const { data, status }: any = useSession();
  const deviceType = useContext(ContextDeviceType as any);
  const isDesktop = deviceType === "desktop";
  const menu: LeftMenuItemProps[] = dummyLeftMenuItems as LeftMenuItemProps[];
  const child =
    data?.user?.role == "ADMIN" && status == "authenticated" ? (
      children
    ) : (
      <LoginToContinue />
    );
  if (!isDesktop) {
    return (
      <>
        {/* Header */}
        <HeaderDashboard />
        {/* children */}
        <div
          style={{
            width: "100vw",
            paddingInline: 30,
            paddingTop: 110,
            paddingBottom: 80,
          }}
        >
          {child}
        </div>
        {/* navigation */}
        {/* <BottomNavigationMenu
          menu={menu}
          setActive={setActive}
          active={active}
        /> */}
      </>
    );
  }
  return (
    <>
      {/* Header */}
      <HeaderDashboard />
      {/* left menu and page */}
      <div className="frfs">
        {/* <LeftMenu
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          menu={menu}
          username={userState.username}
          active={active}
          setActive={setActive}
        /> */}
        <div
          style={{
            // height: 1600,
            width: "100vw",
            // paddingInlineStart: (isExpanded ? 320 : 105) + 30,
            // paddingInlineEnd: 30,
            paddingInline: 30,
            paddingTop: 110,
            paddingBottom: 80,
            transition: "padding-inline-start 0.25s ease",
          }}
        >
          {child}
        </div>
      </div>
    </>
  );
};

export default DashLayout;
