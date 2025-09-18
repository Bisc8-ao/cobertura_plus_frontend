import { styled } from "@mui/material";

const ContainerLotties = styled("div")(({bg}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: "10",
    width: "100%",
    height: "100%",
    background: bg ? "#000000b6" : "transparent",
}));


export { ContainerLotties };
