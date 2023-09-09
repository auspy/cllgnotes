"use client";
import { WhatWeSellProps } from "@cllgnotes/types";
import Colors from "@cllgnotes/types/colors";
import ShadowsType from "@cllgnotes/types/shadows";
import Image from "next/image";
import { useState } from "react";
import { Text } from "ui";

const WhatWeSell = ({ data }: WhatWeSellProps) => {
  const [active, setActive] = useState(0);
  const handleClick = (e, i: number) => {
    setActive(i);
  };
  //   STYLES
  const activeStyle: React.CSSProperties = {
    opacity: 1,
    textShadow: ShadowsType.text,
  };
  const { img } = data[active];

  return (
    <div className="topContainer">
      <div
        className="w100 fcc"
        style={{
          backgroundColor: Colors.lDark,
          borderRadius: 20,
          padding: "80px 45px",
          color: Colors.white,
          height: 706,
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
        <div className="frfssb w100 mt40">
          {/* types */}
          <div
            className="fcfs"
            style={{
              maxWidth: 572,
              rowGap: 20,
              maxHeight: 341.5,
            }}
          >
            {data.map(({ title, desc, color }, i) => (
              <div
                onClick={(e) => handleClick(e, i)}
                key={title + i}
                className="fcfs hover"
                style={{
                  marginBlock: active == i ? 20 : 0,
                }}
              >
                <Text
                  type="h1"
                  textStyle={{
                    opacity: 0.4,
                    textShadow: "unset",
                    ...(active == i && activeStyle),
                  }}
                  color={active == i ? color : "dGrey"}
                >
                  {title}
                </Text>
                {active == i && (
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
              </div>
            ))}
          </div>
          {/* image */}
          <div className="fcc rPosi w100" style={{ alignSelf: "flex-end" }}>
            <Image priority {...img} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeSell;
