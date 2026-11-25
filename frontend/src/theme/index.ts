
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#9e23fc",
      light: "#c084fc",
      dark: "#7e16d1",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#08060d",
      secondary: "#6b6375",
    },
    divider: "#e5e4e7",
  },
  typography: {
    fontFamily: [
      '"Instrument Sans"',
      "system-ui",
      "Segoe UI",
      "Roboto",
      "sans-serif",
    ].join(","),
  },
  shape: {
    borderRadius: 8,
  },
});
