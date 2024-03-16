import type { Config } from "tailwindcss";
// @ts-ignore
import sharedConfig from "@cllgnotes/tailwind/tailwind.config.js";
const Colors = {
  dark: "#141414",
  lDark: "#232426", // light dark
  grey: "#bfbfbf",
  lGrey: "#e1e1e1",
  lGrey2: "#e9e9e9",
  dGrey: "#888888",
  white: "#ffffff",
  bg: "#f4f4f4", // light background
  lBlue: "#d0ebff",
  blue: "#399ae1",
  green: "#68d99c",
  lGreen: "#dff9eb",
  lPink: "#ffd0ec",
  lYellow: "#f4f9df",
  red: "#DB4949",
};

const config: Config = {
  ...sharedConfig,
  theme: {
    extend: {
      colors: {
        ...Colors,
      },
    },
  },
};
module.exports = config;
