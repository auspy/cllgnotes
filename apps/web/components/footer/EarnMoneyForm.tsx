"use client";
import { confettiEffect, useDeviceType } from "@cllgnotes/lib";
import { ButtonFontSizes, textClasses } from "@cllgnotes/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button, TextField } from "ui";

// will send mails to us using user mails
const EarnMoneyForm = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { data, status } = useSession();
  // todo add role here if needed
  // const loggedIn = atomUserNme.role === "USER" && atomUserNme.username;
  const loggedIn = status == "authenticated";
  const device = useDeviceType();
  const isDesktop = device === "desktop";
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonRect = e.target;
    confettiEffect(buttonRect as HTMLButtonElement);
  };
  const focusdStyle: React.CSSProperties = {
    boxShadow: "unset",
    transform: "scale(0.98) translate(3px, 3px)",
    // border: `1.75px solid ${Colors.dark}`,
  };
  return (
    <>
      <div className="w100 flex flex-col lg:flex-row gap-x-[25px] gap-y-4">
        {!loggedIn && (
          <TextField
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`priBtn ${textClasses["h3"]} upper`}
            label="Email"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 90,
                fontSize: 22,
                paddingInline: 2,
              },
              "& .MuiFormLabel-root": {
                top: 12,
                left: 10,
                "&.Mui-focused": {
                  top: -2,
                  left: 2,
                },
              },
            }}
            style={{
              border: "unset",
              width: "100%",
              ...(isFocused ? focusdStyle : {}),
            }}
            variant="outlined"
          />
        )}
        {
          <Button
            width={"100%"}
            buttonStyles={{ maxWidth: loggedIn || !isDesktop ? "none" : 289 }}
            text="vote for note 😉"
            onClick={handleClick}
            fontSize={ButtonFontSizes.large}
          />
        }
      </div>
    </>
  );
};

export default EarnMoneyForm;
