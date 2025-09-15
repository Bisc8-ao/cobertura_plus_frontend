import React from 'react'
import {  Box, Typography, styled, Card as Muicard, CardContent as MuiCardContent,  } from "@mui/material";
import { UseLangContext } from '../../../hooks';
import { Card, ChartPie, BarChart } from '../../../components';
import { vectorImages } from "../../../assets";


const Wrapper = styled("section")({
    display: "flex",
    flexDirection: "column",
    gap: "4.3rem",

});

const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: "2.4rem",
});

const MuiCard = styled(Muicard, {
    shouldForwardProp: (prop) => prop !== "gridColumn",
})(({ gridColumn }) => ({
    gridColumn,
    borderRadius: "1.6rem",
    position: "relative",
    boxShadow:
        "0 0 2px 0 rgba(145 158 171 / 20%),0 12px 24px -4px rgba(145 158 171 / 12%)",
}));


const CardContent = styled(MuiCardContent, {
    shouldForwardProp: (prop) => prop !== "padding",
})(({ padding }) => ({
    padding,
}));

const LinearDotted = styled("div")({
    position: "absolute",
    bottom: "7rem",
    left: "0",
    right: "0",
    height: "1px",
    borderTop: "1px dashed #ccc",
    zIndex: 1,
});
function Statistics() {
    const { translations } = UseLangContext();


  return (
      <React.Fragment>
          <Wrapper>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                      variant="h1"
                      component="h1"
                      sx={{ fontSize: "2.4rem" }}
                  >
                      {translations.pages.dashboard.oi}
                  </Typography>
                  <img src={vectorImages.emoji.waving_hand} width={25} />
              </Box>

              <Container>
                  <Box
                      sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(4, 1fr)",
                          gap: 2,
                          "@media (max-width:768px)": {
                              gridTemplateColumns: "repeat(2, 1fr)",
                          },
                          "@media (max-width:430px)": {
                              gridTemplateColumns: "repeat(1, 1fr)",
                          },
                      }}
                  >
                      <Card />
                      <Card />
                      <Card />
                      <Card />
                  </Box>

                  <Box
                      sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(6, 1fr)",
                          alignItems: "start",
                          gap: 4,
                      }}
                  >
                      <MuiCard gridColumn="span 2">
                          <CardContent padding="8rem 2rem">
                              <ChartPie />
                          </CardContent>
                          <LinearDotted />
                      </MuiCard>
                      <MuiCard gridColumn="span 4">
                          <CardContent padding="2rem">
                              <BarChart />
                          </CardContent>
                      </MuiCard>
                  </Box>
              </Container>
          </Wrapper>
      </React.Fragment>
  );
}

export {Statistics}
