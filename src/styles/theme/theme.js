import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

export const Theme = createTheme({
    typography: {
    fontFamily: "Public Sans, sans-serif",
  },
    palette: {
        primary: {
            main: blue[500],
        },
    },
});

