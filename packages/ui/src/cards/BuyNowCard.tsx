"use client";
import Image from "next/image";
import { defaultImg } from "@cllgnotes/lib";
import { BuyNowCardProps, HeadingType } from "@cllgnotes/types";
import { ButtonBuyNow, Heading, Text } from "ui";
import { useEffect } from "react";
import ShadowsType from "@cllgnotes/types/shadows";
import Colors from "@cllgnotes/types/colors";

const BuyNowCard = ({
  src = defaultImg.src,
  alt = defaultImg.alt,
  price,
  discount,
  style,
  _id,
  cardProps,
  saleAlarm = (
    <>
      Hurry 😱<span className="semi"> 7 hours</span> left at this price!
    </>
  ),
}: BuyNowCardProps) => {
  // console.log("is client");
  // useEffect(() => {
  //   const handleEvent = () => {
  //     const buynowCard = document.getElementById("buynowcard");
  //     if (buynowCard && buynowCard.parentElement) {
  //       let width = buynowCard.parentElement.offsetWidth;
  //       buynowCard.style.setProperty(
  //         "--x-buynowcard",
  //         width ? `${width}px` : "853px"
  //       );
  //     }
  //   };
  //   window.addEventListener("resize", handleEvent);
  //   return () => {
  //     window.removeEventListener("resize", handleEvent);
  //   };
  // }, []);
  const isDesktop = true;
  const isTablet = false;
  const isMobile = false;
  const color = "red";
  const desktopContainerStyle: React.CSSProperties = {
    width: 361,
    // transform: "translate(var(--x-buynowcard), 0)",
    position: "absolute",
    zIndex: 2000,
  };
  const mobileContainerStyle: React.CSSProperties = {
    width: "100%",
  };
  return (
    <>
      <div
        id="buynowcard"
        className="fcc"
        style={{
          ...(isDesktop ? desktopContainerStyle : mobileContainerStyle),
          border: "1px solid #383838",
          boxShadow: ShadowsType.box4,
          borderRadius: 5,
          padding: 7,
          backgroundColor: Colors.bg,
          ...style,
        }}
      >
        <div
          style={{
            height: 266,
            width: "100%",
            position: "relative",
            borderRadius: "5px 5px 0 0",
            overflow: "hidden",
          }}
        >
          <Image
            src={src || defaultImg.src}
            alt={alt || defaultImg.alt}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        {/* BELOW IMAGE DATA */}
        <div className={` w100 ${""}`}>
          {/* {!isDesktop && <CourseDetails {...cardProps} />} */}
          <div
            className={`w100 ${isTablet ? "frcsb" : isMobile && "frc"}`}
            style={{
              ...(isMobile ? { flexWrap: "wrap" } : {}),
              padding: 8,
            }}
          >
            <div className="">
              <div className="frc" style={{ gap: 10 }}>
                <Text textClass="fs0" type="h2">
                  {"₹ " + price}
                </Text>
                <Text
                  textStyle={{ textDecorationLine: "line-through" }}
                  textClass="fs0"
                  type="medi22"
                >
                  ₹ 3129
                </Text>
                <Text
                  textStyle={{
                    color: Colors[color],
                    WebkitTextFillColor: Colors[color],
                    fontSize: 36,
                  }}
                  textTransform="uppercase"
                  textClass="fs0 h1Highlight"
                  type="h2"
                  text={`${
                    discount || 100 - Number(((price / 3129) * 100).toFixed())
                  }%
                off`}
                ></Text>
              </div>
              {/* SALE ALARM */}
              {/* <p className="regu12 mt5" style={{ color: "var(--red)" }}>
                {saleAlarm}
              </p> */}
            </div>
            {/* BUTTON */}
            <ButtonBuyNow amount={price} _id={_id} buttonClass="mt20" />
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNowCard;
