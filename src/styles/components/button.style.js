import { styled } from "@mui/material";
import { Button } from "@mui/material";

export const MainButton = styled(Button)(({ theme, variant }) => ({
    display: "flex",
    gap: "1rem",
    fontSize: theme.typography.sizes.base,
    textTransform: "none",
    fontWeight: "500",
    padding: "1.2rem",
    color:
        variant === "contained"
            ? theme.palette.common.white
            : theme.palette.common.black,
    background:
        variant === "contained" ? theme.palette.primary.main : "transparent",
    border:
        variant === "outlined"
            ? `1px solid ${theme.palette.gray[900]}`
            : "none",
    boxShadow: "none",
    borderRadius: ".4rem",
    "&:hover": {
        boxShadow: "none",
        filter: "brightness(90%)",
    },
    "&.MuiButton-loading": {
        opacity: 0.5,
        cursor: "not-allowed",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },

    "& .MuiButton-loadingIndicator": {
        color: theme.palette.common.white,
    },
    "&.MuiButton-loading .btn-text": {
        opacity: 0,
    },
    "@media (max-width:430px)": {
        width: "100%",
    },
}));
