import PublicSans from "../../assets/fonts/PublicSans-VariableFont_wght.ttf";

export const globalStyle = {
    "@font-face": [
        {
            fontFamily: "Public Sans",
            fontStyle: "normal",
            fontWeight: 400,
            src: `url(${PublicSans}) format("truetype")`,
        },
    ],
    "*": {
        boxSizing: "border-box",
        padding: "0",
        margin: "0",
       textDecoration: "none"
    },
    html: {
        scrollBehavior: "smooth",
    },
    ":root": {
        fontSize: "62.5%",
    },
    body: {
        fontFamily: "Public Sans, sans-serif",
    },
};
