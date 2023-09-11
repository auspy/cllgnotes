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
export const GradientColors = {
  white:
    " radial-gradient(65.76% 65.76% at 49.96% -1.95%, rgba(244, 244, 244, 0.00) 0%, rgba(255, 255, 255, 0.00) 0.01%, rgba(250, 250, 250, 0.00) 54.33%, #F4F4F4 100%)",
  pdf: "linear-gradient(180deg, rgba(244, 244, 244, 0.00) 0%, rgba(244, 244, 244, 0.96) 61.99%, #F4F4F4 100%)",
};
export type ColorsType = keyof typeof Colors;
export default Colors;
