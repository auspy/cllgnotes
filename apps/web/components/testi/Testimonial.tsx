"use client";
import { IconButton, Text } from "ui";
import { ChevronLeftRounded, ChevronRightRounded } from "../mui";
import { TestimonialProps } from "@cllgnotes/types";
import { useEffect, useRef, useState } from "react";
import TestiUserAvatar from "./TestiUserAvatar";

const Testimonial = ({ data }: TestimonialProps) => {
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
    <div className="frfssb topContainer">
      <IconButton
        onClick={() => {
          changeActive(-1);
        }}
        icon={<ChevronLeftRounded style={iconStyle} />}
      />
      <div className="fcc w100" style={{ maxWidth: 1000, rowGap: 60 }}>
        <Text
          textAlign="center"
          type="h1"
          textStyle={{ fontSize: 56 }}
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
  );
};

export default Testimonial;
