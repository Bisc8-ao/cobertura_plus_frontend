import React from "react";
import { Typography, Box, styled } from "@mui/material";
import { vectorImages } from "../../../assets";
import { UseLangContext } from "../../../hooks";

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

const Card = styled("div")({
    background:
        "linear-gradient(135deg, rgba(28, 165, 230, 0.08) 0%, rgba(28, 166, 230, 0.65) 100%)",
    height: "18rem",
    width: "25rem",
    borderRadius: "1.6rem",
    padding: "2rem",
});

const CardContent = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent:"space-between",
    height: "100%",
    width: "100%",
});

const CardHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    "& > span:last-child": {
        color: theme.palette.primary.main,
        fontWeight: "700",
        fontSize:"1.4rem"
    },
}));
const CardFooter = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    "&:last-child": {
        color: theme.palette.primary.main,
        fontWeight: "700",
        fontSize: "1.4rem",
    },
}));
function Dashboard() {
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
                        {translations.dashboard.oi}
                    </Typography>
                    <img src={vectorImages.emoji.waving_hand} width={25} />
                </Box>

                <Container>
                    <Box>
                        <Card>
                            <CardContent>
                                <CardHeader>
                                    <span>
                                        <img
                                            src={
                                                vectorImages.icons.icglassusers
                                            }
                                            alt=""
                                        />
                                    </span>
                                    <span>-0.1%</span>
                                </CardHeader>
                                <CardFooter>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: ".8rem",
                                        }}
                                    >
                                        <span>Novos testes</span>
                                        <span>1.35m</span>
                                    </Box>
                                    <span>2</span>
                                </CardFooter>
                            </CardContent>
                        </Card>
                    </Box>
                </Container>
            </Wrapper>
        </React.Fragment>
    );
}

export { Dashboard };
