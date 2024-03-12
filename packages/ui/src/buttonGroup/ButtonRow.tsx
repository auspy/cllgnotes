"use client";
import { ButtonRowProps } from "@cllgnotes/types";
import Button from "../buttons/Button";
import { FontWeightEnum } from "@cllgnotes/types";
import { ButtonFontSizes } from "@cllgnotes/types";
import { useState } from "react";

const ButtonRow = ({
  data,
  maxWidth,
  minWidth,
  rowGap = 25,
  commonButtonProps,
  height = 120,
  columnGap = 30,
  onClick,
  select = ["", {}],
}: ButtonRowProps) => {
  const [showMore, setShowMore] = useState(false);
  const width = data.length > 3 ? 318 : 334;
  const varHeight = data.length > 3 ? height || 90 : 120;
  // console.log("SHOW MORE", showMore);
  return (
    <div
      className={`flex overflow-scroll flex-row lg:overflow-visible gap-x-[20px] scrollbar lg:grid lg:gap-y-[${columnGap}]  w100`}
      style={{
        rowGap: rowGap,
        paddingBottom: 4,
        paddingRight: 4,
        gridTemplateColumns: `repeat(auto-fit, minmax(${width}px, 1fr))`,
      }}
    >
      {data.map((item, index) => (
        // console.log(" MORE", data.length > 8 && index > 7 ? showMore : true),
        <div key={index}>
          <Button
            key={item.text + index}
            {...commonButtonProps}
            {...item}
            buttonClasses={`shadow-box5 ${
              (data.length > 8 && index >= 7 ? showMore : true)
                ? "flex"
                : "flex lg:hidden"
            } ${commonButtonProps?.buttonClasses} ${
              select[1] && item.text?.toLowerCase() in select[1]
                ? "filterButtonDisabled"
                : ""
            }`}
            buttonStyles={{
              maxWidth: maxWidth,
              minWidth: minWidth,
              ...commonButtonProps?.buttonStyles,
              ...item.buttonStyles,
            }}
            fontSize={
              commonButtonProps?.fontSize ||
              item.fontSize ||
              ButtonFontSizes.small
            }
            textProps={{
              fontWeight: FontWeightEnum.semi,
            }}
            iconLeft={true}
            width={"100%"}
            height={varHeight}
            onClick={(e) => {
              setShowMore(false);
              onClick &&
                onClick(e, { label: item.text, key: select[0] }, index);
            }}
          />
          {/* MORE BUTTON */}
          {index == (showMore ? data.length - 1 : 6) && data.length > 8 && (
            <div className={`frc hidden lg:flex gap-x-[10px]`}>
              <Button
                key={item.text + "show" + index}
                {...commonButtonProps}
                text={showMore ? "Less" : "More"}
                buttonClasses={`shadow-box5  ${commonButtonProps?.buttonClasses}`}
                buttonStyles={{
                  maxWidth: maxWidth && maxWidth / 2,
                  minWidth: minWidth && minWidth / 2,
                  ...commonButtonProps?.buttonStyles,
                  ...item.buttonStyles,
                }}
                fontSize={
                  commonButtonProps?.fontSize ||
                  item.fontSize ||
                  ButtonFontSizes.small
                }
                textProps={{
                  fontWeight: FontWeightEnum.semi,
                }}
                iconLeft={true}
                // width={"100%"}
                height={varHeight}
                onClick={(e) => {
                  setShowMore(!showMore);
                  // onClick && onClick(e, { label: "More", key: "More" }, index);
                }}
              />
              {/* <Button
                    key={item.text + "show" + index}
                    {...commonButtonProps}
                    text={"Next"}
                    buttonClasses={`shadow-box5 ${commonButtonProps?.buttonClasses}`}
                    buttonStyles={{
                      maxWidth: maxWidth / 2,
                      minWidth: minWidth / 2,
                      ...commonButtonProps?.buttonStyles,
                      ...item.buttonStyles,
                    }}
                    fontSize={
                      commonButtonProps?.fontSize ||
                      item.fontSize ||
                      ButtonFontSizes.small
                    }
                    textProps={{
                      fontWeight: FontWeightEnum.semi,
                    }}
                    iconLeft={true}
                    // width={"100%"}
                    height={height}
                    onClick={(e) => {
                      onClick &&
                        onClick(e, { label: "Next", key: "Next" }, index);
                    }}
                  /> */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ButtonRow;
