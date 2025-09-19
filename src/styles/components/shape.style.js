import styled from "@emotion/styled";

const Shape = styled("div")(() => ({
    position: "absolute",
    top: "1rem",
    left: "1.2rem",
    zIndex: "2",

    "@media (min-width: 1512px)": {
        top: "2.3rem",
        left: "2.5rem",
    },
    "@media (max-width: 1024px)": {
        display: "none",
    },
}));

const Shap2 = styled("div")(() => ({
    position: "absolute",
    bottom: ".9rem",
    right: "1.2rem",


    zIndex: "2",
    "& img": {
        transform: "rotate(180deg)",
    },

    "@media (min-width: 1512px)": {
        bottom: "1rem",
        right: "2.5rem",
    },
    "@media (max-width: 1024px)": {
       display:"none"
    },
    "@media (max-width: 430px)": {
        bottom: "1rem",
        right: "1rem",
    },
}));

export { Shape, Shap2 };
