import { createTheme } from "@mui/material/styles";


export const Theme = createTheme({
    typography: {
        fontFamily: "Public Sans, sans-serif",
        sizes: {
            xs: "1.2rem", //12 px
            base: "1.4rem", // 14 px
            xl: "2rem", // 20px
        },
    },
    palette: {
        primary: {
            main: "#1CA5E6",
        },
        common: {
            white: "#fff",
            black: "#000",
        },
        gray: {
            300: "#AEAFB0",
            400: "#919EAB",
            500: "#637381",
            900: "#1d1b208f",
            "900_25": "#1d1b2041",
            950: "#1C252E",
        },
        red: {
            500: "#fa0000ff",
            700: "#d30000ff",
        },
        mint: {
            50: "#CAFDF5",
        },
        cyan: {
            500: "#00B8D9",
        },
    },
});

