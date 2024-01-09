"use client";
import { Text, TestiUserAvatar, TestiGrp, ButtonArrow } from "ui";
import type { TestiCardGrpProps } from "@cllgnotes/types";
import { useEffect, useRef, useState } from "react";
import { useDeviceType } from "@cllgnotes/lib";

const Testimonial = ({ data }: TestiCardGrpProps) => {
  const device = useDeviceType(true);
  const [active, setActive] = useState(0);
  const activeRef = useRef(active);
  const changeActive = (increment: number) => {
    let nextIndex = active + increment;
    if (nextIndex < 0) nextIndex = data.length - 1;
    else if (nextIndex > data.length - 1) nextIndex = 0;
    setActive(nextIndex);
    activeRef.current = nextIndex;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      changeActive(activeRef.current + 1);
      activeRef.current === data.length - 1;
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const leftIcon = (
    <ButtonArrow
      onClick={() => {
        changeActive(-1);
      }}
      isLeft={true}
    />
  );
  const rightIcon = (
    <ButtonArrow
      onClick={() => {
        changeActive(1);
      }}
    />
  );
  return (
    <div className="w100 fcc" style={{ gap: 100 }}>
      <div className="frfssb topContainer">
        {device.isDesktop && leftIcon}
        <div
          className="fcc rPosi w100"
          style={{ maxWidth: 1000, rowGap: 60, paddingTop: 200 }}
        >
          <Text
            textAlign="center"
            type="h1"
            textStyle={{
              fontSize: "clamp(40px,6vw,56px)",
              position: "absolute",
              top: 0,
              height: 130,
              // maxHeight: 130,
              overflow: "hidden",
            }}
          >{`"${data[active]?.text}"`}</Text>
          <div className={device.isDesktop ? "" : "frcsb gap-y-4 w100"}>
            {!device.isDesktop && leftIcon}
            <TestiUserAvatar {...data[active].user} onCard={false} />
            {!device.isDesktop && rightIcon}
          </div>
        </div>
        {device.isDesktop && rightIcon}
      </div>
      <TestiGrp data={data} />
    </div>
  );
};

export default Testimonial;
