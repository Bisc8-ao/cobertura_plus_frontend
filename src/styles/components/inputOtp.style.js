import { styled } from "@mui/material";

const InputOtp = styled("input")(({ theme, error }) => ({
    width: "100%",
    height: "4.5rem",
    textAlign: "center",
    fontSize: "1.4rem",
    border: `1px solid ${
        error ? theme.palette.red[500] : theme.palette.gray[400]
    }`,
    borderRadius: "0.8rem",
    outline: "none",
    transition: "all 0.2s ease-in-out",

    "&:hover": {
        border: `2px solid ${
            error ? theme.palette.red[700] : theme.palette.gray[950]
        }`,
    },
    "&:focus": {
        border: `2px solid ${
            error ? theme.palette.red[700] : theme.palette.gray[950]
        }`,
    },

    "@media (max-width: 390px)": {
        height: "3.6rem",
        fontSize: "1.2rem",
    },
}));


const InputOtpContainer = styled("div")({
    display: "flex",

    gap: "1.2rem",

    "@media (min-width: 1512px)": {
        gap: "1.2rem",
    },
});

export { InputOtp, InputOtpContainer };
