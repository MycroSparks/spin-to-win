import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  palette: {
    primary: {
      main: "#a1d050",
    },
    secondary: {
      main: "#7f50d0",
    },
    background: {
      default: "#E8E5DA",
      paper: "#E8E5DA",
    },
    text: {
      primary: "#304C89",
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
