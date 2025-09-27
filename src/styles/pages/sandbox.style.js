import {
    styled,
    FormControl as MuiFormControl,
    IconButton as MuiIconButton,
} from "@mui/material";

export const Sand_Wrapper = styled("div")({
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    zIndex: 1,
});

export const Sand_ContainerForm = styled("form")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",

    position: "absolute",
    bottom: "2rem",
    gap: "1rem",
    width: "50%",
    padding: "2rem 0",
    background: theme.palette.background.default,
    borderRadius: ".8rem",
    overflow: "hidden",
    zIndex: "1",

    "@media (max-width: 942px)": {
        flexDirection: "column",
        padding: "2rem",
        width: "85%",
    },
}));

export const Sand_FormControl = styled(MuiFormControl)(({ theme }) => ({
    width: "70%",
    "@media (max-width: 942px)": {
        width: "100%",
    },
    "& label": {
        fontSize: theme.typography.sizes.base,
        background: "#fff",
        color: theme.palette.gray[800],
    },
}));

export const Sand_IconButton = styled(MuiIconButton)(() => ({
    //animation: "spin 4s linear infinite",
    /*"@keyframes spin": {
        from: {
            transform: "rotate(0deg)",
        },
        to: {
            transform: "rotate(360deg)",
        },
    },*/
}));
