"use client";
import Colors from "@cllgnotes/types/colors";
import { createTheme } from "ui";
const theme = createTheme({
  palette: {
    primary: {
      main: Colors.dark,
    },
  },
  typography: {
    fontFamily: "GeneralSans-Variable",
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 22,
          textTransform: "uppercase",
          fontWeight: 700,
          fontFamily: "Poppins",
          color: Colors.dark,
          top: 12,
          "&.Mui-focused": {
            color: Colors.dark,
            top: 0,
            textTransform: "capitalize",
            fontWeight: 500,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: `${Colors.dark}`,
          borderWidth: 1,
          height: 90,
          fontSize: 22,
          fontWeight: 500,
          color: Colors.dark,
        },
        notchedOutline: {
          borderColor: Colors.dark,
        },
      },
    },
  },
});

export default theme;
