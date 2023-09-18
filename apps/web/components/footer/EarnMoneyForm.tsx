"use client";
import { useDeviceType } from "@cllgnotes/lib";
import { ButtonFontSizes, textClasses } from "@cllgnotes/types";
import { Button, TextField } from "ui";

// will send mails to us using user mails
const EarnMoneyForm = () => {
  const loggedIn = false;
  const device = useDeviceType();
  const isDesktop = device === "desktop";
  return (
    <>
      <div className="w100 flex flex-col lg:flex-row gap-x-[25px] gap-y-4">
        {!loggedIn && (
          <TextField
            className={`priBtn ${textClasses["h3"]} upper`}
            label="Email"
            sx={{
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
            }}
            variant="outlined"
          />
        )}
        {
          <Button
            width={"100%"}
            buttonStyles={{ maxWidth: loggedIn || !isDesktop ? "none" : 289 }}
            text="vote for note 😉"
            fontSize={ButtonFontSizes.large}
          />
        }
      </div>
    </>
  );
};

export default EarnMoneyForm;
