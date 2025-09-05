import {styled, TextareaAutosize } from "@mui/material";

export const TextArea = styled(TextareaAutosize)(({ theme}) => ({
    width: "100%",
    fontSize: theme.typography.sizes.base,
    padding: "1.4rem",
    borderRadius: "0.5rem",
    border: `.1rem solid ${theme.palette.gray["900_25"]}`,
    outline: "none",
    transition: "all .2s ease-in-out",
    resize: "none",
    "&:hover ": {
        borderColor: theme.palette.common.black,
    },
    "&:focus": {
        borderColor: `.2rem solid ${theme.palette.common.black}`,
    },
}));
