"use client";
import {
  IconButton,
  Text,
  ChevronLeftRounded,
  ChevronRightRounded,
  TestiUserAvatar,
  TestiGrp,
} from "ui";
import { TestiCardGrpProps } from "@cllgnotes/types";
import { useEffect, useRef, useState } from "react";

const Testimonial = ({ data }: TestiCardGrpProps) => {
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
  const iconStyle: React.CSSProperties = {
    height: 30,
    width: 30,
  };
  return (
    <div className="w100 fcc" style={{ gap: 100 }}>
      <div className="frfssb topContainer">
        <IconButton
          onClick={() => {
            changeActive(-1);
          }}
          icon={<ChevronLeftRounded style={iconStyle} />}
        />
        <div
          className="fcc rPosi w100"
          style={{ maxWidth: 1000, rowGap: 60, paddingTop: 200 }}
        >
          <Text
            textAlign="center"
            type="h1"
            textStyle={{
              fontSize: 56,
              position: "absolute",
              top: 0,
              height: 130,
              // maxHeight: 130,
              overflow: "hidden",
            }}
          >{`"${data[active]?.text}"`}</Text>
          <TestiUserAvatar {...data[active].user} onCard={false} />
        </div>

        <IconButton
          onClick={() => {
            changeActive(1);
          }}
          icon={<ChevronRightRounded style={iconStyle} />}
        />
      </div>
      <TestiGrp data={data} />
    </div>
  );
};

export default Testimonial;
