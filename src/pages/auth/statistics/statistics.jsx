import React from "react";
import {
    Box,
    Typography,
    styled,
    Card as Muicard,
    CardContent as MuiCardContent,
} from "@mui/material";
import { useLangContext } from "../../../hooks";
import { Card, ChartPie, BarChart } from "../../../components";
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
})(({ gridColumn, theme }) => ({
    gridColumn,
    borderRadius: "1.6rem",
    position: "relative",
    background: theme.palette.card.background,
    boxShadow: theme.customShadows.card,
    "@media (max-width:820px)": {
        gridColumn: "span 1",
    },
}));

const CardContent = styled(MuiCardContent, {
    shouldForwardProp: (prop) => prop !== "padding",
})(({ padding }) => ({
    padding,
}));

const LinearDotted = styled("div")(({ theme }) => ({
    position: "absolute",
    bottom: "7rem",
    left: "0",
    right: "0",
    height: "1px",
    borderTop: `1px dashed ${
        theme.palette.mode === "dark" ? "#7a7a7a33" : "#e0e0e0"
    }`,
    zIndex: 1,
}));
function Statistics() {
    const { translations } = useLangContext();
    const itemCards = [
        {
            title: "Diarios",
            percent: 2.5,
            total: 28,
        },
        {
            title: "Semanal",
            percent: 8.5,
            total: 208,
        },
        {
            title: "Mensal",
            percent: 43.5,
            total: 2008,
        },
        {
            title: "Anual",
            percent: 73.5,
            total: 20008,
        },
    ];

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
                        {itemCards.map((item, index) => (
                            <Card key={index} {...item} />
                        ))}
                    </Box>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(6, 1fr)",
                            alignItems: "start",
                            gap: 4,
                            "@media (max-width:820px)": {
                                gridTemplateColumns: "repeat(1, 1fr)",
                            },
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

export { Statistics };
