import React from "react";
import { Typography, Box, styled } from "@mui/material";
import { Card } from "../../../components";
import { vectorImages } from "../../../assets";
import { useLangContext } from "../../../hooks";

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

function Dashboard() {
    const { translations } = useLangContext();
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
                </Container>
            </Wrapper>
        </React.Fragment>
    );
}

export { Dashboard };
