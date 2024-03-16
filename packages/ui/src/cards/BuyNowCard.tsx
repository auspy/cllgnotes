"use client";
import Image from "next/image";
import { defaultImg, useDeviceType } from "@cllgnotes/lib";
import { Borders, BuyNowCardProps } from "@cllgnotes/types";
// import { useEffect } from "react";
import { ShadowsType } from "@cllgnotes/types";
import Colors from "@cllgnotes/types/colors";
import { CustomImageLoader } from "../../loader.config";
import Text from "../text/Text";
import ButtonBuyNow from "../../../../apps/web/components/buttons/ButtonBuyNow";

const BuyNowCard = ({
  src,
  alt,
  price,
  discount,
  style,
  _id,
  type,
  children,
  saleAlarm = (
    <>
      Hurry 😱<span className="semi"> 7 hours</span> left at this price!
    </>
  ),
  className,
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
  const device = useDeviceType();
  const isDesktop = device == "desktop";
  const isTablet = device == "tablet";
  const isMobile = device == "mobile";
  const color = "red";
  const desktopContainerStyle: React.CSSProperties = {
    width: 361,
    // transform: "translate(var(--x-buynowcard), 0)",
    position: "absolute",
    top: 0,
    zIndex: 10,
    right: 35,
  };
  const mobileContainerStyle: React.CSSProperties = {
    width: isMobile ? "calc(100% - 40px)" : "calc(100% - 70px)",
    right: isMobile ? 20 : 35,
  };
  return (
    <>
      <div
        id="buynowcard"
        className={`fcc ${className}`}
        style={{
          ...desktopContainerStyle,
          ...(!isDesktop && mobileContainerStyle),
          border: "1px solid #383838",
          boxShadow: ShadowsType.box4,
          borderRadius: 5,
          padding: 5,
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
            src={CustomImageLoader({ src, type })}
            alt={alt || defaultImg.alt}
            fill
            style={{
              objectFit: "cover",
              border: Borders.dark,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}
          />
        </div>
        {/* BELOW IMAGE DATA */}
        <div
          className={`w100 ${isTablet ? "frcsb" : isMobile && "frc"} flex-wrap`}
          style={{
            ...(isMobile ? { flexWrap: "wrap" } : {}),
            padding: 8,
          }}
        >
          <div className="w100 mb-[15px]">{!isDesktop && children}</div>

          <div className="">
            <div className="frc flex-wrap" style={{ gap: 10 }}>
              <Text textClass="fs0" type="h2">
                {"₹ " + (price || 0)}
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
                  discount ||
                  100 - Number((((price || 0) / 3129) * 100).toFixed())
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
    </>
  );
};

export default BuyNowCard;
