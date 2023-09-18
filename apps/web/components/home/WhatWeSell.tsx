"use client";
import { useDeviceType } from "@cllgnotes/lib";
import { WhatWeSellProps } from "@cllgnotes/types";
import Colors from "@cllgnotes/types/colors";
import ShadowsType from "@cllgnotes/types/shadows";
import Image from "next/image";
import { useState } from "react";
import { Text } from "ui";

const WhatWeSell = ({ data }: WhatWeSellProps) => {
  const device = useDeviceType();
  const isDesktop = device === "desktop";
  const isMobile = device === "mobile";
  const isTablet = device === "tablet";
  const [active, setActive] = useState(0);
  const handleClick = (e, i: number) => {
    setActive(i);
  };
  //   STYLES
  const activeStyle: React.CSSProperties = {
    opacity: 1,
    textShadow: ShadowsType.text,
  };
  const imgg = (actv = active) => (
    <div className="fcc rPosi w100" style={{ alignSelf: "flex-end" }}>
      <Image priority {...data[actv].img} />
    </div>
  );
  // STLES
  const notDesktopStyle: React.CSSProperties = isDesktop
    ? {}
    : {
        maxWidth: "unset",
        rowGap: 60,
        maxHeight: "unset",
      };

  return (
    <div className="topContainer">
      <div
        className="w100 fcc"
        style={{
          backgroundColor: Colors.lDark,
          borderRadius: 20,
          padding: isDesktop ? "80px 45px" : "80px 25px",
          color: Colors.white,
          height: isDesktop ? 706 : "unset",
        }}
      >
        <Text
          type="h2"
          textAlign="center"
          textStyle={{
            maxWidth: 824,
            lineHeight: "120%",
          }}
        >
          Explore an array of resources for any subject, any semester, any
          course
        </Text>
        <div className="frfssb flex-col lg:flex-row w100 mt40">
          {/* types */}
          <div
            className="fcfs"
            style={{
              maxWidth: 572,
              rowGap: 20,
              maxHeight: 341.5,
              ...notDesktopStyle,
            }}
          >
            {data.map(({ title, desc, color }, i) => (
              <div
                onClick={(e) => handleClick(e, i)}
                key={title + i}
                className="fcfs hover"
                style={{
                  marginBlock: active == i || !isDesktop ? 20 : 0,
                  gap: !isDesktop ? 20 : "unset",
                }}
              >
                <Text
                  type="h1"
                  textStyle={{
                    fontSize: "clamp(40px, 6vw,64px)",
                    opacity: 0.4,
                    textShadow: "unset",
                    ...((active == i || !isDesktop) && activeStyle),
                  }}
                  color={active == i || !isDesktop ? color : "dGrey"}
                >
                  {title}
                </Text>
                {(active == i || !isDesktop) && (
                  <Text
                    type="medi22"
                    textClass="mt10"
                    textStyle={{
                      lineHeight: "150%",
                      opacity: 0.8,
                    }}
                  >
                    {desc}
                  </Text>
                )}
                {!isDesktop && imgg(i)}
              </div>
            ))}
          </div>
          {/* image */}
          {isDesktop && imgg()}
        </div>
      </div>
    </div>
  );
};

export default WhatWeSell;
