import {
    Card as MuiCard,
    CardContent as MuiCardContent,
    Box,
    TextField,
    Button as MuiButton,
    styled,
} from "@mui/material";

export const Prof_Wrapper = styled("section")({
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
});
export const Prof_ContainerContent = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    gap: "4.3rem",
    "@media (min-width:1920px)": {
        padding: "0 16rem",
    },
}));

export const Prof_ContainerForm = styled("div")({
    display: "grid",
    alignItems: "start",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "4rem",
    "@media (max-width:820px)": {
        gridTemplateColumns: "repeat(1, 1fr)",
    },
});

export const Prof_Card = styled(MuiCard)(({ gridColumn, theme }) => ({
    gridColumn: gridColumn,
    borderRadius: "1.6rem",
    position: "relative",
    background: theme.palette.card.background,
    boxShadow:theme.customShadows.card,
    "@media (max-width:820px)": {
        gridColumn: "span 1",
    },
}));
export const Prof_CardContent = styled(MuiCardContent)(({ padding }) => ({
    padding: padding,
    "@media (max-width:430px)": {
        padding: padding === "4rem" && "2rem 1.5rem",
    },
}));

export const Prof_ContainerPhoto = styled("div")(() => ({
    height: "14.4rem",
    width: "14.4rem",
    border: "2px dashed rgba(145, 158, 171, 0.2)",
    borderRadius: "50%",
    cursor: "pointer",
    position: "relative",
    margin: "auto",
}));

export const Prof_PhotoInput = styled("input")(() => ({
    border: "0",
    clip: " rect(0px,0px,0px)",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "0 -1px -1px 0",
    padding: "0",
    position: "absolute",
    width: "1px",
    whiteSapace: "nowrap",
    overflow: "hidden",
}));

export const Prof_ContainerSvg = styled("div")(() => ({
    width: "100%",
    height: "100%",
    position: "relative",
    borderRadius: "inherit",
    padding: "1rem",
}));

export const Prof_ContainerSvgContent = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: ".8rem",
    position: "absolute",
    top: ".7rem",
    left: ".7rem",
    width: "90%",
    height: "90%",
    color: "#919EAB",
    background: "rgba(145, 158, 171, 0.08)",
    borderRadius: "inherit",
    zIndex: "9",
    opacity: "1",
    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        opacity: ".5",
    },
    "& > span": {
        fontSize: "1.2rem",
        fontWeight: "400",
        lineHeight: "1.5",
    },
    "& > svg": {
        width: "2rem",
        height: "2rem",
    },
}));

export const Prof_Photo = styled("img")(() => ({
    gap: ".8rem",
    position: "absolute",
    top: ".7rem",
    left: ".7rem",
    width: "90%",
    height: "90%",
    objectFit: "cover",
    borderRadius: "inherit",
    zIndex: "9",
    opacity: "1",
    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": {
        opacity: ".5",
    },
}));

export const Prof_BoxInfo = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: ".5rem",
    "& > span:first-child": {
        fontSize: "1.4rem",
        fontWeight: "800",
    },
    "& > span:last-child": {
        fontSize: "1.2rem",
        fontWeight: "500",
    },
}));

export const Prof_CardInputs = styled("div")(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: "1.6rem",
    rowGap: "2.4rem",
    width: "100%",
    "@media (max-width:430px)": {
        gridTemplateColumns: "repeat(1, 1fr)",
    },
}));

export const Prof_Input = styled(TextField)(({ theme }) => ({
    "& label": {
        fontSize: theme.typography.sizes.base,
        background:
            theme.palette.mode === "dark"
                ? "#1d252f"
                : theme.palette.common.white,
        color:
            theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.gray[900],
        lineHeight: "2.4rem",
        top: "-.2rem",
        paddingRight: ".5rem",
    },

    "& label.Mui-focused": {
        color: theme.palette.mode === "dark" ? theme.palette.common.white : "#1d1b20",
        top: "-.2rem",
        fontWeight: "600",
    },
    "& label.MuiInputLabel-shrink": {
        top: "-.1rem",
        color:
            theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.gray[900],
    },
    "& label.MuiFormLabel-root:not(.Mui-error).Mui-focused": {
        top: "-.1rem",
    },
    "& label.Mui-error": {
        color: theme.palette.red[700],
        fontWeight: "500",
    },

    "& .MuiInputBase-input": {
        fontSize: theme.typography.sizes.base,
        padding: "1.4rem",
        color:
            theme.palette.mode === "dark" ? theme.palette.common.white : theme.palette.gray[900],
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderRadius: ".8rem",
            border: `.1rem solid ${
                theme.palette.mode === "dark"
                    ? "rgb(53, 61, 71)"
                    : theme.palette.gray["900_25"]
            }`,
            borderWidth: ".1rem",
            padding: "2.4rem 1.4rem",
        },
        "&.Mui-focused fieldset": {
            borderColor:
                theme.palette.mode === "dark"
                    ? "#ffff"
                    : theme.palette.gray["900_25"],
            borderWidth: ".1rem",
        },
        "&.Mui-error fieldset": {
            borderColor: theme.palette.red[500],
        },
        "&.Mui-error.Mui-focused fieldset": {
            borderColor: theme.palette.red[500],
        },
    },
    "& .MuiFormHelperText-root": {
        fontSize: theme.typography.sizes.xs,
        marginLeft: "0",
    },
}));

export const Prof_ButtonResetPass = styled(MuiButton)(({theme}) => ({
    border: `.1rem solid ${theme.palette.mode === "dark" ? "#ffff" : "#000"}`,
    fontSize: "1.4rem",
    padding: "1rem",
    textTransform: "none",
    "@media (max-width:430px)": {
        width: "100%",
    },
}));
export const Prof_BoxContainer = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "2rem",
}));


export const Prof_BoxBtn = styled(Box)(() => ({
    display: "flex",
    justifyContent: "end",
    flexDirection: "row",
    alignItems: "center",
    padding: "0 4rem 3rem 4em",
    gap: "2rem",
    "@media (max-width:430px)": {
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        width: "100%",
        padding: "0 1rem 3rem 1rem",
    },
}));

export const Prof_DeleteAccount = styled("button")(({ theme }) => ({
    position: "absolute",
    background: "transparent",
    color:
        theme.palette.mode === "dark"
            ? theme.palette.common.white
            : theme.palette.common.black,

    height: "4rem",
    width: "4rem",
    top: "2rem",
    right: "2rem",
    borderRadius: "50%",
    border: `1px solid ${theme.palette.red[100]}`,
    cursor: "pointer",
    transition: "background .3s ease-in-out",

    "& svg": {
        fontSize: "1.8rem",
    },

    "&:hover": {
        background: theme.palette.red[100],
    },
}));
