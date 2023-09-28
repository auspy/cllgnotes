"use client";
const items = [
  <div className="space-x-5 flex iniline-flex">
    <div>📝 </div>
    <div> PRESENTATIONS</div>
    <div>📖 </div>
    <div> NOTES</div>
    <div>📖 </div>
    <div> QUESTION PAPERS</div>
  </div>,
];
import { Logo, Button, MovingBanner, Text } from "ui";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  SxProps,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
// gql imports
import { LOGIN, REGISTER } from "@/api/graphql/gql";
import { atomToast, atomUserName } from "@cllgnotes/lib";
import Image from "next/image";
import { BannerFontSizeEnum } from "@cllgnotes/types";

export default function Login() {
  // console.log("Login");
  const params = useSearchParams().get("t");
  const roleType =
    useSearchParams().get("role") == "creator" ? "ADMIN" : "USER";
  const [isLoginPage, setIsLogin] = useState<boolean>(params != "r");
  const [_, setUserState] = useRecoilState(atomUserName);
  const [role, setRole] = useState<"USER" | "ADMIN">(roleType);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [, setToast] = useRecoilState(atomToast);
  const router = useRouter();
  const [clicked, setClicked] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [login, { data, client, loading }] = useMutation(
    isLoginPage ? LOGIN : REGISTER
  );
  const buttonDisabled =
    clicked ||
    loading ||
    username?.length < 4 ||
    password?.length < 4 ||
    !role ||
    password?.length > 30 ||
    username?.length > 70;
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "USER" | "ADMIN"
  ) => {
    setRole(newAlignment);
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const usernameHelperText = (): string => {
    if (username?.length == 0) {
      return "";
    }
    if (username?.length > 70) {
      return "Username must be less than 70 characters";
    }
    if (username?.length < 4) {
      return "Username must be atleast 4 characters";
    }
    // if (data?.login?.msg.includes("user not found")) {
    //   return "user not found";
    // }
    return "";
  };
  const handleButtonClick = () => {
    // console.log(username, password);
    setClicked(true);
    if (
      username?.length > 3 &&
      password?.length > 3 &&
      (isLoginPage ? true : email?.length > 13)
    ) {
      // console.log("clicked");

      login({
        variables: {
          username: username.trim(),
          password: password.trim(),
          ...(isLoginPage ? {} : { email: email.trim() }),
          role,
        },
        onError: (error) => {
          console.log("error", error);
          setToast({
            text: "Error: Login failed",
            type: "error",
            secs: 5000,
          });
          setClicked(false);
        },
        onCompleted: (data) => {
          setUsername("");
          setPassword("");
          // console.log("completed 2", data);
          if (
            data?.login?.status == "failed" ||
            data?.register?.status == "failed"
          ) {
            setToast({
              text: data?.login?.msg || data?.register?.msg,
              type: "error",
              secs: 5000,
            });
            setClicked(false);
            return;
          }
          if (!isLoginPage) {
            setToast({
              text: "Registration successful. Please login",
              type: "success",
              secs: 5000,
            });

            setIsLogin(true);
            setClicked(false);
            return;
          }
          setToast({
            text: "Login successful. Welcome To Cllgnotes 🥳",
            type: "success",
            secs: 5000,
          });
          localStorage.setItem(
            "user",
            JSON.stringify({ username: data.login.data?.username, role })
          );
          // set token
          const token = data?.login?.token;
          // localStorage.setItem("authToken", data?.login?.token);
          if (!token) {
            setToast({
              text: "Login failed. Try again!",
              type: "failed",
              secs: 5000,
            });
            return;
          }
          // * LOGIN SUCCESS
          client.resetStore();
          // console.log("token", data?.login?.token);
          setUserState({ username: data.login.data?.username, role });
          if (role == "ADMIN") {
            router.push("/dashboard");
            return;
          }
          router.push("/");
        },
      });
    }
    // console.log("query data", data, loading);
  };
  const textFieldStyle: React.CSSProperties = {
    height: 60,
    width: "100%",
    fontSize: 16,
  };
  const nonEmptyTextFieldStyle: SxProps = {
    "& .MuiFormLabel-root": {
      top: 0,
      textTransform: "capitalize",
      fontWeight: 500,
    },
  };
  const textFieldSx: SxProps = {
    m: 1,
    width: "35ch",
    fontSize: 16,
    "& .MuiFormLabel-root": {
      fontSize: 16,
      top: 2,
      width: "fit-content",
      "&.Mui-focused": {
        top: 0,
      },
    },
    "& .MuiInputBase-root": {
      fontSize: 16,
      height: 60,
    },
    "& .MuiOutlinedInput-root": {
      paddingInlineStart: 0,
    },
  };
  return (
    <>
      <div
        className="fcc h-full lg:h-screen lineBg"
        style={{
          overflow: "hidden",
          paddingTop: 30,
          width: "100vw",
        }}
      >
        {/* Logo */}
        <Logo fontSize={36} />
        <div className="mb20"></div>
        {/* Banner */}
        <MovingBanner
          textType={BannerFontSizeEnum.h3e}
          text="notes  📖  question papers 📝 presentations 📖 notes  📖  question papers notes  📖  question papers 📝 presentations 📖 notes  📖  question papers"
        />

        {/* Login  Box*/}
        <div className="fccc h-full lg:flex-row justify-center items-center p-10">
          {/* Login photo */}
          <div className="w-[252px] h-[203px] lg:w-[533px] lg:h-[438px]  md:justify-items-center mb-14 md:mb-0 rPosi">
            <Image src="/images/login.png" alt="Login" fill priority />
          </div>

          {/* Login form */}
          <div className="bg-white w-full lg:w-[400px] flex flex-col items-center p-6 sm:ml-0 md:ml-32 border border-black border-solid rounded-md">
            <div className="font-[600] font-generalsans text-2xl text-[#141414] mb-3">
              {isLoginPage ? "Login" : "Register"}
            </div>
            {/* email field */}
            {!isLoginPage && (
              <TextField
                sx={textFieldSx}
                style={{
                  ...textFieldStyle,
                  ...nonEmptyTextFieldStyle,
                }}
                id="outlined-email"
                label="Email"
                variant="outlined"
                type="text"
                value={email}
                color={"primary"}
                error={
                  (email.length > 0 && email?.length < 4) || email?.length > 70
                }
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            )}
            {/* username field */}
            <TextField
              sx={textFieldSx}
              style={{
                ...textFieldStyle,
                ...nonEmptyTextFieldStyle,
              }}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              type="text"
              value={username}
              helperText={usernameHelperText()}
              color={"primary"}
              error={
                (username.length > 0 && username?.length < 4) ||
                username?.length > 70
              }
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <FormControl
              style={{
                ...textFieldStyle,
                ...(password?.length > 0 && nonEmptyTextFieldStyle),
              }}
              sx={textFieldSx}
              variant="outlined"
              color="primary"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                value={password}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                error={
                  (password.length > 0 && password?.length < 4) ||
                  password?.length > 30
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
            {/* <ToggleButtonGroup
              sx={textFieldSx}
              color="primary"
              value={role}
              style={{ width: "100%" }}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton
                style={textFieldStyle}
                disabled={role == "USER"}
                value="USER"
              >
                User
              </ToggleButton>
              <ToggleButton
                style={textFieldStyle}
                disabled={role == "ADMIN"}
                value="ADMIN"
              >
                Creator
              </ToggleButton>
            </ToggleButtonGroup> */}
            <Button
              buttonClasses="btn-click mt10 shadow-box2"
              text={isLoginPage ? "Login" : "Register"}
              height={70}
              width={"100%"}
              onClick={handleButtonClick}
            />
            {/* <Button
              type="submit"
              value={pageType}
              disabled={buttonDisabled}
              buttonClass="mt20"
              loading={clicked || loading}
              buttonStyle={{ boxShadow: "none" }}
              onClick={handleButtonClick}
            /> */}
            <SwitchPageType isLogin={isLoginPage} setIsLogin={setIsLogin} />
          </div>
        </div>
      </div>
    </>
  );
}

const SwitchPageType = ({
  isLogin,
  setIsLogin,
}: {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const text = isLogin ? "New to CllgNotes?" : "Already registered?";
  const linkText = isLogin ? "Create new account" : "Click here to login";
  const handleClick = () => {
    setIsLogin(!isLogin);
  };
  return (
    <>
      <div className="frc mt30 flex-wrap">
        <Text textClass="mr5" type="regu14" text={text} />
        <button
          onClick={handleClick}
          className="semi14"
          style={{
            color: "var(--primary)",
            textDecoration: "underline",
            textTransform: "none",
            textAlign: "left",
          }}
        >
          {linkText}
        </button>
      </div>
    </>
  );
};
