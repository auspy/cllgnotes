"use client";
import { Borders } from "@cllgnotes/types";
import Colors from "@cllgnotes/types/colors";
import { createTheme } from "@mui/material";
const muiTheme = createTheme({
  palette: {
    primary: {
      main: Colors.dark,
    },
  },
  typography: {
    fontFamily: "GeneralSans-Variable",
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          border: Borders.dark,
          backgroundColor: Colors.white,
          fontWeight: 600,
        },
        label: {},
        deleteIcon: {
          backgroundColor: Colors.white,
          color: Colors.dGrey,
          borderRadius: 20,
          fontSize: 16,
          "&:hover": {
            color: Colors.white,
            backgroundColor: Colors.grey,
          },
        },
        deleteIconFilledColorPrimary: {
          color: Colors.dark,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 22,
          textTransform: "uppercase",
          fontWeight: 700,
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
          // borderColor: `${Colors.dark}`,
          // borderWidth: 1,
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

export default muiTheme;
