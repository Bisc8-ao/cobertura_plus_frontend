import { createTheme } from "@mui/material/styles";

export const Theme = (mode = "light") =>
    createTheme({
        typography: {
            fontFamily: "Public Sans, sans-serif",
            sizes: {
                xs: "1.2rem",
                base: "1.4rem",
                xl: "2rem", // 20px
            },
        },
        palette: {
            mode,
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
                100: "#f76363ad",
                500: "#fa0000ff",
                700: "#d30000ff",
            },
            mint: {
                50: "#CAFDF5",
            },
            cyan: {
                500: "#00B8D9",
            },

            appBar:
                mode === "dark"
                    ? {
                          background: "#151a216b",
                          beforeBg: "rgba(20, 26, 33, 0.63)",
                      }
                    : {
                          background: "#ffffff42",
                          beforeBg: "rgba(255, 255, 255, 0.63)",
                      },

            card:
                mode === "dark"
                    ? {
                          background: "#1d252f",
                          border: "rgb(53, 61, 71)",
                      }
                    : {
                          background: "#ffffff",
                          border: "#1d1b2041",
                      },

            input:
                mode === "dark"
                    ? {
                          background: "#1d252f",
                          label: "#ffffff",
                          border: "rgb(53, 61, 71)",
                      }
                    : {
                          background: "#ffffff",
                          label: "#1d1b20",
                          border: "#1d1b2041",
                      },

            button:
                mode === "dark"
                    ? {
                          border: "#ffffff",
                          text: "#ffffff",
                      }
                    : {
                          border: "#000000",
                          text: "#000000",
                      },

            ...(mode === "dark" && {
                background: {
                    default: "#151a21",
                    paper: "#151a21",
                },
                text: {
                    primary: "#ffffff",
                    secondary: "#b3b3b3",
                },
            }),
        },

        // blocos de sombras centralizados
        customShadows: {
            card:
                mode === "dark"
                    ? "none"
                    : "0 0 2px 0 rgba(145 158 171 / 20%), 0 12px 24px -4px rgba(145 158 171 / 12%)",
            inputFocus:
                mode === "dark"
                    ? "0 0 0 2px rgba(255,255,255,0.2)"
                    : "0 0 0 2px rgba(145,158,171,0.2)",
        },
    });
