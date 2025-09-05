import { Alert, styled } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";


const ContainerForm = styled("form")(
    ({ theme, borderRadius, padding, width }) => ({
        display: "flex",
        flexDirection: "column",
        gap: "4rem",
        width: width || "50%",
        padding: padding || "0",
        background: theme.palette.common.white,
        borderRadius: borderRadius,

        "@media (min-width: 1512px)": {
            width: width ? "22%" :"50%",
        },
        "@media (max-width: 1024px)": {
            width: width ? "40%" : "70%",
        },
        "@media (max-width: 820px)": {
            width: width ? "50%" : "70%",
        },
        "@media (max-width: 768px)": {
            width: width ? "53%" : "70%",
        },
        "@media (max-width: 430px)": {
            width: "92%",
        },
        "@media (max-width: 320px)": {
            gap: "1.4rem",
            padding: padding ? "2rem" : "0",
        },
    })
);

const ContainerFormContent = styled("div")(({ theme, alignment }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
    justifyContent: alignment || "start",
    alignItems: alignment || "start",

    "& > span ": {
        fontSize: theme.typography.sizes.base,
        fontWeight: "400",
        lineHeight: "2.2rem",
        color: theme.palette.gray[500],
        textAlign: alignment || "start",
    },
    "& span > a": {
        color: theme.palette.primary.main,
        fontWeight: "600",
    },

    "& img": {
        width: "6rem",
    },
    "@media (min-width: 1512px)": {
        "& img": {
            width: "15%",
        },
    },
    "@media (max-width: 1024px)": {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
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

const ContainerInputs = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "2.4rem",

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
    "@media (max-width: 390px)": {
        gap: "1.6rem",
        "& div[data-element='Link_back'] a": {
            fontSize: theme.typography.sizes.xs,
        },
        "& div[data-element='Link_back'] a svg": {
            fontSize: "1rem",
        },
    },
    "@media (max-width: 320px)": {
        gap: "1.4rem",
    },
}));

const AdaptiveAlert = styled(Alert)(({ theme }) => ({
    background: theme.palette.mint[50],
    fontSize: theme.typography.sizes.base,
    "@media (max-width: 320px)": {
        fontSize: theme.typography.sizes.xs,
    },
}));

const AdaptiveInfoIcon = styled(InfoIcon)(({ theme }) => ({
    color: theme.palette.cyan[500],
    fontSize: "2.4rem",
    "@media (max-width: 320px)": {
        fontSize: "2rem",
    },
}));

const TermsService = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& span ": {
        fontSize: theme.typography.sizes.xs,
        color: theme.palette.gray[500],
    },

    "& span > a": {
        fontWeight: "800",

        color: theme.palette.common.black,
        borderBottom: `1px solid ${theme.palette.gray[500]}`,
        paddingBottom: "0.3rem",
        transition: " all 0.3s ease-in-out",
    },
    "& span > a:hover": {
        color: theme.palette.primary.main,
        borderBottom: `1px solid ${theme.palette.common.black}`,
    },
    "@media (max-width: 320px)": {
        "& span ": {
            fontSize: "1rem",
        },
    },
}));

const ForgotPassword = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    gap: "1.5rem",
    fontSize: "1.4rem",
    "& a": {
        color: theme.palette.gray[500],
    },
}));

const NameContainer = styled("div")({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1.6rem",
    width: "100%",

    "@media (max-width: 430px)": {
        gridTemplateColumns: "1fr",
    },
});

export {
    ContainerForm,
    ContainerFormContent,
    ContainerInputs,
    ForgotPassword,
    TermsService,
    NameContainer,
    AdaptiveAlert,
    AdaptiveInfoIcon,
};
