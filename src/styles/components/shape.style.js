import styled from "@emotion/styled";
import { vectorImages } from "../../assets/svgs";
const Shape = styled("div")(({ theme }) => ({
    position: "absolute",
    top: "1rem",
    left: "1.2rem",
    zIndex:"2",

    "@media (min-width: 1512px)": {
        top: "2.3rem",
        left: "2.5rem",
    },
}));

const Shap2 = styled("div")(({ theme }) => ({
    position: "absolute",
    bottom: "1rem",
    right: "1.2rem",
    zIndex: "2",
    "& img": {
        transform: "rotate(180deg)",
    },
    "& button": {
        display: "inline-block",

        fontWeight: " bold",

        background: `url(${vectorImages.shapes.vector})`,
        backgroundPosition: "100%",
        backgroundSize: "100%",
        backgroundRepeat:"no-repeat",

        border:"none",
        position: "relative",
        padding:"10rem"
    },
    "@media (min-width: 1512px)": {
        bottom: "1rem",
        right: "2.5rem",
    },
}));

export { Shape, Shap2 };
