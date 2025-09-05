import { Box as MuiBox, styled } from "@mui/material";

import { images } from "../../assets";

const Ho_Wrapper = styled("section")(({ theme }) => ({
    width: "100%",
    height: "100%",
    padding: "1.2rem",
    position: "relative",
    overflow: "hidden",
    "@media (min-width: 1512px)": {
        padding: " 2.5rem",
    },
    "@media (max-width: 1024px)": {
        padding: "7rem 3rem 3rem 3rem",
    },
    "@media (max-width: 430px)": {
        padding: "7rem 1rem 2rem 1rem",
    },
}));

const Ho_Container = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",

    padding: " 10rem 5rem",
    borderRadius: "1.5rem",
    position: "relative",
    zIndex: 1,
    overflow: "hidden",
    "&::after": {
        content: '""',
        position: "absolute",
        top: "0",
        left: "0",
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.02)),
        url(${images.backgrounds.background_2})`,
        backgroundPosition: "100%",
        backgroundSize: "cover",
        zIndex: -1,
        width: "100%",
        height: "100%",
    },
    "@media (max-width: 1024px)": {
        alignItems: "center",
        justifyContent: "center",
    },
}));

const Ho_ContainerBtn = styled("div")(({ theme }) => ({
    position: "absolute",
    zIndex: "3",
    right: "1.5rem",
    bottom: "2.5rem",
    display: "flex",
    alignItems: "end",

    "& button": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",

        position: "relative",

        cursor: "pointer",
        border: "none",
        width: "24rem",
        height: "4rem",
    },
    "& button > svg": {
        position: "absolute",
        width: "100%",
        height: "100%",
        inset: 0,
        objectFit: "contain",
    },
    "& button > span": {
        fontSize: theme.typography.sizes.base,
        color: theme.palette.gray[300],
        fontWeight: "800",
    },

    "@media (min-width: 1512px)": {
        right: "3rem",
    },
    "@media (max-width: 1024px)": {
        right: "4rem",
        bottom: "3.5rem",

        "& button": {
            width: "33rem",
            height: "5rem",
        },
    },
    "@media (max-width: 820px)": {
        bottom: "3rem",
        "& button": {
            width: "28rem",
            height: "5rem",
        },
    },
    "@media (max-width: 768px)": {
        "& button": {
            width: "24rem",
            height: "4rem",
        },
    },
    "@media (max-width: 430px)": {
        right: "1.5rem",
        bottom: "1.8rem",
        "& button": {
            width: "22rem",
            height: "4rem",
        },
    },
    "@media (max-width: 390px)": {
        "& button": {
            width: "19rem",
            height: "3.5rem",
        },
    },
    "@media (max-width: 375px)": {
        "& button": {
            width: "15.5rem",
            height: "3rem",
        },
    },
    "@media (max-width: 320px)": {
        "& button": {
            width: "13rem",
            height: "2.5rem",
        },
        "& button > span": {
            fontSize: theme.typography.xs,
        },
    },
    "@media (max-width: 320px) and (max-height: 480px)": {
        "& button": {
            width: "10.4rem",
            height: "2.2rem",
        },
        "& button > span": {
            fontSize: "1rem",
        },
    },
}));

const Ho_ContainerContent = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "5.6rem",

    "&:first-of-type": {
        fontSize: "4rem",
        fontWeight: "800",
        color: theme.palette.common.white,
    },

    "@media (min-width: 1512px)": {
        "&:first-of-type": {
            fontSize: "6rem",
        },
    },
    "@media (max-width: 1024px)": {
        alignItems: "center",
        justifyContent: "center",
        "&:first-of-type": {
            textAlign: "center",
            fontSize: "6rem",
        },
    },
    "@media (max-width:768px)": {
        "&:first-of-type": {
            fontSize: "4rem",
        },
    },
    "@media (max-width: 430px)": {
        "&:first-of-type": {
            fontSize: "2.5rem",
        },
    },
    "@media (max-width: 375px)": {
        gap: "2.5rem",
        "&:first-of-type": {
            fontSize: "2.4rem",
        },
    },
    "@media (max-width: 320px)": {
        "&:first-of-type": {
            fontSize: "1.8rem",
        },
    },
}));

const Ho_Box = styled(MuiBox)(({ theme }) => ({
    display: "flex",
    gap: "1.5rem",
    flexDirection: "row",
    "& a": {
        fontSize: "1.4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.common.white,
        border: `1px solid ${theme.palette.common.white}`,
        padding: "1rem 2rem",
        borderRadius: ".4rem",
    },
    "@media (max-width:820px)": {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",

        "& a": {
            border: "none",
            borderBottom: `1px solid ${theme.palette.common.white}`,
            padding: ".5rem 0",
            borderRadius: "0",
            width: "75%",
        },
    },
}));

export {
    Ho_Wrapper,
    Ho_Container,
    Ho_ContainerBtn,
    Ho_ContainerContent,
    Ho_Box,
};
