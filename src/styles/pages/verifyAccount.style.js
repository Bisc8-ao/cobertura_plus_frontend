import { images } from "../../assets";
import { styled, Typography as MuiTypography } from "@mui/material";

export const Ver_Wrapper = styled("div")({
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

export const Ver_Typography = styled(MuiTypography)(() => ({
    fontSize: "1.9rem",
    fontWeight: "800",
    lineHeight: "2.8rem",
}));
