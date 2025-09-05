import { styled } from "@mui/material";

const Container_Grid = styled("div")(({gridTemplateColumns}) =>({
    display: "grid",
    gridTemplateColumns: gridTemplateColumns,
    height: "100%",
    "@media (max-width: 1024px)": {
        gridTemplateColumns:"1fr"
    }
}));

 const GridImg = styled("div")(({ img, borderRadius }) => ({
     borderRadius: borderRadius,
     backgroundImage: `url(${img})`,
     backgroundPosition: "center",
     backgroundSize: "cover",
     backgroundRepeat: "no-repeat",
     "@media (max-width: 1024px)": {
         display:"none",
     },
 }));

const GridContent = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});


export { Container_Grid, GridImg, GridContent };
