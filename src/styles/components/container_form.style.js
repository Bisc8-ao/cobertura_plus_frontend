import { styled } from "@mui/material";

const ContainerForm = styled("form")({
    display: "flex",
    flexDirection: "column",
    gap: "4rem",
    width: "50%",

    "@media (max-width: 1024px)": {
        width: "70%",
    },
    "@media (max-width: 430px)": {
        width: "92%",
    },
    "@media (max-width: 320px)": {
        gap: "1.4rem",
    },
});

const ContainerFormContent = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",

    "& > span ": {
        fontSize: theme.typography.sizes.base,
        fontWeight: "400",
        lineHeight: "2.2rem",
        color: theme.palette.gray[500],
    },
    "& span > a": {
        color: theme.palette.primary.main,
        fontWeight: "600",
    },

    "@media (max-width: 1024px)": {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    "@media (max-width: 320px)": {
        gap: ".5rem",
        "& > span ": {
            fontSize: theme.typography.sizes.xs,

        },
    },
}));

const ContainerInputs = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "2.4rem",
    "@media (max-width: 320px)": {
        gap: "1.4rem",
    },
});

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
};
