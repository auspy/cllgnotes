import Colors from "@cllgnotes/types/colors";
import HeroText from "../home/HeroText";
import { ButtonFontSizes, textClasses } from "@cllgnotes/types";
import { Button, TextField, ThemeProvider } from "ui";
import theme from "../muiTheme";

const EarnMoneyFooter = ({
  containerStyle,
}: {
  containerStyle?: React.CSSProperties;
}) => {
  const loggedIn = false;
  return (
    <div className="topContainer" style={{ ...containerStyle }}>
      <div
        className="rPosi"
        style={{
          height: 660,
          display: "flex",
          backgroundColor: Colors.lGrey2,
          borderRadius: 20,
          padding: 30,
        }}
      >
        <HeroText
          desc="We will allow users to upload their notes and presentations and earn money on them if we reach 1001 votes."
          text={
            <>
              Want to upload
              <br /> your notes and
            </>
          }
          highlightText="earn money?"
          element={
            <>
              <ThemeProvider theme={theme}>
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
              </ThemeProvider>
              <Button
                width={"100%"}
                buttonStyles={{ maxWidth: loggedIn ? "none" : 289 }}
                text="vote for note 😉"
                fontSize={ButtonFontSizes.large}
              />
            </>
          }
          img={{
            src: "/images/earn.png",
            alt: "earn money",
            height: 361,
            width: 579,
          }}
          imgStyles={{ bottom: "unset", top: 55, right: 30 }}
          descMaxWidth={441}
          color="green"
        />
      </div>
    </div>
  );
};

export default EarnMoneyFooter;
