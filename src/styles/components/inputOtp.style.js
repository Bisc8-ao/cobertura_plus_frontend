import { styled } from "@mui/material";

const InputOtp = styled("input")(({ theme, error }) => ({
    width: "100%",
    height: "4.5rem",
    textAlign: "center",
    fontSize: "1.4rem",
    background: "transparent",
    border: `1px solid ${
        error ? theme.palette.red[500] : theme.palette.gray[400]
    }`,
    borderRadius: "0.8rem",
    outline: "none",
    transition: "all 0.2s ease-in-out",
    color:
        theme.palette.mode === "dark"
            ? theme.palette.common.white
            : theme.palette.common.black,

    "&:hover": {
        border: `2px solid ${
            error
                ? theme.palette.red[700]
                : theme.palette.mode === "dark"
                ? theme.palette.common.white
                : theme.palette.gray[950]
        }`,
    },
    "&:focus": {
        border: `2px solid ${
            error
                ? theme.palette.red[700]
                : theme.palette.mode === "dark"
                ? theme.palette.common.white
                : theme.palette.gray[950]
        }`,
    },

    "@media (max-width: 390px)": {
        height: "3.6rem",
        fontSize: "1.2rem",
    },
}));

const InputOtpContainer = styled("div")(({ gap }) => ({
    display: "flex",

    gap: gap,

    "@media (min-width: 1512px)": {
        gap: gap,
    },
}));

export { InputOtp, InputOtpContainer };
