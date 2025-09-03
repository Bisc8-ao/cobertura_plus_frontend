import { styled } from "@mui/material";
import { Typography } from "@mui/material";

import { Link } from "react-router-dom";
export const He_Wrapper = styled("header")({
    position: "fixed",
    width: "100%",
    zIndex: "100",
});

export const He_Container = styled("div")(({ isPageHome }) => ({
    padding: `${isPageHome ? "4rem 6rem" : "4rem"}`,
    "@media (min-width: 1512px)": {
        padding: `${isPageHome ? "4rem 6rem" : "4rem"}`,
    },
    "@media(max-width:1024px)": {
        padding: "2rem 4rem",
    },
    "@media (max-width: 430px)": {
        padding: "2rem 1rem",
    },
}));

export const He_Content = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems:"center"
});

export const Span = styled(Typography)(({theme}) =>({
    color:theme.palette.gray[950],
    fontZise: theme.typography.sizes.base,
    fontWeight:"600"
}));


export const He_ImgContainer = styled("div")({
    "& img": {
        width: "10rem",
        "@media (min-width: 1512px)": {
            width: "14rem",
        },
    },
});

export const RouterLink = styled(Link)(({ theme, isPageHome }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: ".7rem",

    "& span": {
        fontSize: theme.typography.sizes.base,
        color: isPageHome
            ? theme.palette.common.white
            : theme.palette.gray[950],
        fontWeight: "600",
    },

    "& svg": {
        animation: "spin 4s linear infinite",
    },

    "@keyframes spin": {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
    },

    "@media(max-width:1024px)": {
        "& span": {

            color: theme.palette.gray[950],
           
        },
    },

    "@media (max-width: 320px)": {
        "& span ": {
            fontSize: theme.typography.sizes.xs,
            textTransform: "capitalize",
        },
        "& span > b": {
            display: "none",
        },
    },
}));
