"use client";
import Header from "@/components/header/Header";
import { useDeviceType } from "@cllgnotes/lib/hooks";
import Colors from "@cllgnotes/types/colors";
import Image from "next/image";
import { SearchBar, Text } from "ui";
const ExploreHero = ({
  heading = "Explore documents",
}: {
  heading?: string;
}) => {
  const deviceType = useDeviceType();
  const isDesktop = deviceType === "desktop";
  return (
    <div
      className="w100 fcc"
      style={{
        backgroundColor: Colors.lGrey,
        height: "min(700px,max(422px,50vh))",
      }}
    >
      <Header />
      <div className="frfesb topContainer" style={{ height: "100%" }}>
        <div className="fcfs" style={{ gap: 30, paddingBottom: 43 }}>
          <Text type="h1">{heading}</Text>
          <SearchBar
            options={["SRM Haryana", "Ashoke University"]}
            height={60}
          />
        </div>
        {isDesktop && (
          <div
            className="rPosi"
            style={{
              width: 629,
              height: 229,
            }}
          >
            <Image src={"/images/explore.png"} alt="notes" fill priority />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreHero;
