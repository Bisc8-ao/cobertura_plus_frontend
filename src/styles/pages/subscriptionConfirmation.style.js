import { styled } from "@mui/material";

import { images } from "../../assets";


const Subs_Wrapper = styled("div")({
    width: "100%",
    height: "100%",
    backgroundImage: `url(${images.backgrounds.background_1})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const Subs_Container = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "4rem",
    width: "30%",
    padding: "4rem",
    background: theme.palette.common.white,
    borderRadius: "1.5rem",
    "& div[data-element='Link_back']": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    "& div[data-element='Link_back'] a": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: " .8rem",
        fontSize: theme.typography.sizes.base,
        color: theme.palette.gray[950],
    },
    "& div[data-element='Link_back'] a svg": {
        fontSize: theme.typography.sizes.xs,
    },

    "@media (min-width: 1512px)": {
        width: "22%",
    },
    "@media (max-width: 1024px)": {
        width: "40%",
    },
    "@media (max-width: 820px)": {
        width: "50%",
    },
    "@media (max-width: 768px)": {
        width: "53%",
    },
    "@media (max-width: 430px)": {
        width: "92%",
    },
    "@media (max-width: 320px)": {
        gap: "1.4rem",
        padding: "2rem",
    },
}));

const Subs_ContainerContent = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
    justifyContent: "center",
    alignItems: "center",

    "& > span ": {
        fontSize: theme.typography.sizes.base,
        fontWeight: "400",
        lineHeight: "2.2rem",
        color: theme.palette.gray[500],
        textAlign: "center",
    },


    "& img": {
        width: "6rem",
    },
    "@media (min-width: 1512px)": {
        "& img": {
            width: "15%",
        },
    },

    "@media (max-width: 390px)": {
        "& > span ": {
            fontSize: theme.typography.sizes.xs,
        },
    },
    "@media (max-width: 320px)": {
        gap: ".5rem",
        "& > span ": {
            fontSize: theme.typography.sizes.xs,
        },
    },
}));

export { Subs_Wrapper, Subs_Container, Subs_ContainerContent };
