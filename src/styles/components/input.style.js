import { styled, THEME_ID } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";

export const Input = styled(TextField)(({ theme }) => ({
    "& label": {
        fontSize: theme.typography.sizes.base,
        background: theme.palette.common.white,
        color: theme.palette.gray[900],
        lineHeight: "2.4rem",
        top: "-.5rem",
        paddingRight: ".5rem",
    },

    "& label.Mui-focused": {
        color: "#1d1b20",
        top: "-.2rem",
        fontWeight: "600",
    },
    "& label.MuiInputLabel-shrink": {
        top: "-.1rem",
        color: theme.palette.gray[900],
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
        color: theme.palette.gray[900],
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderRadius: ".4rem",
            border: `.1rem solid ${theme.palette.gray["900_25"]}`,
            borderWidth: ".1rem",
            padding: "1rem",
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.gray["900_25"],
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

export const FormControlPassword = styled(FormControl)(({ theme }) => ({
    width: "100%",

    "& label": {
        fontSize: theme.typography.sizes.base,
        background: "#fff",
        color: theme.palette.gray[900],
        lineHeight: "2.4rem",
        top: "-.5rem",
        paddingRight: ".5rem",
    },

    "& label.Mui-focused": {
        color: "#1d1b20",
        top: "-.2rem",
        fontWeight: "600",
    },

    "& label.MuiInputLabel-shrink": {
        top: "-.1rem",
        color: theme.palette.gray[900],
    },

    "& label.MuiFormLabel-root:not(.Mui-error).Mui-focused": {
        top: "-.1rem",
    },

    "& label.Mui-error": {
        color: theme.palette.red[500],
        fontWeight: "500",
    },

    "& .MuiInputBase-input": {
        fontSize: theme.typography.sizes.base,
        padding: "1.4rem",
        color: theme.palette.gray[900],
    },

    "& .MuiOutlinedInput-root": {
        borderColor: theme.palette.red[500],
        "& fieldset": {
            borderRadius: ".4rem",
            border: `.1rem solid ${theme.palette.gray["900_25"]}`,
            borderWidth: ".1rem",
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.gray["900_25"],
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
