import { styled } from "@mui/material";
import { Button } from "@mui/material";

export const MainButton = styled(Button)(({ theme }) => ({
    fontSize: theme.typography.sizes.base,
    textTransform: "none",
    fontWeight: "500",
    padding: "1.2rem",
    color: theme.palette.common.white,
    background: theme.palette.primary.main,
    boxShadow: "none",
    borderRadius: ".4rem",
    "&:hover": {
        boxShadow: "none",
        filter: "brightness(90%)",
    },
}));
