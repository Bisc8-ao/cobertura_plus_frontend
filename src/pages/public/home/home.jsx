import React from "react";
import { Box, styled } from "@mui/material";
import { Button } from "../../../components";
import { vectorImages } from "../../../assets/svgs";
import * as Styled from "../../../styles";
import { useNavigate } from "react-router-dom";

const Wrapper = styled("section")(({ theme }) => ({
    width: "100%",
    height: "100%",
    padding: "1.2rem",
    position: "relative",
    overflow: "hidden",
    "@media (min-width: 1512px)": {
        padding: " 2.5rem",
    },
}));

const Container = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "flex-end",
    width: "100%",
    height: "100%",

    padding: " 10rem 2rem",
    borderRadius: "1.5rem",
    position: "relative",
    zIndex: 1,
    overflow: "hidden",
    "&::after": {
        content: '""',
        position: "absolute",
        top: "0",
        left: "0",
        background: "linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15))",
        filter: "brightness(80%)",
        zIndex: -1,

        width: "100%",
        height: "100%",
    },
}));
const ContainerBtn = styled("div")(({ theme }) => ({
    position: "absolute",
    zIndex: "3",
    right: "1.5rem",
    bottom: "2.5rem",
    display: "flex",
    alignItems: "end",

    "& button": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",

        position: "relative",

        cursor: "pointer",
        border: "none",
        width: "24rem",
        height: "4rem",
    },
    "& button > svg": {
        position: "absolute",
        width: "100%",
        height: "100%",
        inset: 0,
        objectFit: "contain",
    },
    "& button > span": {
        fontSize: theme.typography.sizes.base,
        color: theme.palette.gray[300],
        fontWeight: "800",
    },
}));
const ContainerContent = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    gap: "5.5rem",

    "&:first-child": {
        fontSize: "4rem",
        fontWeight: "800",
        color: theme.palette.common.white,
    },
}));



function Home() {
    const navigate = useNavigate()

    function handleClick(){
        navigate("/signin")
    }
    return (
        <React.Fragment>
            <Wrapper>
                <Styled.Shape>
                    <img
                        src={vectorImages.shapes.shap_1}
                        alt="shape decorativo"
                        style={{ width: "100%", height: "100%" }}
                    />
                </Styled.Shape>
                <Container>
                    <ContainerContent>
                        <span>
                            Teste a disponibilidade
                            <br /> do nosso serviço
                            <br /> na sua região.
                        </span>

                        <Box sx={{ display: "flex", gap: "1.5rem" }}>
                            <Button
                                text="Na minha localização"
                                variant="contained"
                            />
                            <Button
                                text="Outro lugar"
                                variant="outlined"
                            />
                        </Box>
                    </ContainerContent>
                </Container>

                <Styled.Shap2>
                    <img
                        src={vectorImages.shapes.shap_1}
                        alt="shape decorativo"
                        style={{ width: "100%", height: "100%" }}
                    />
                </Styled.Shap2>
                <ContainerBtn>
                    <button onClick={handleClick}>
                        <svg
                            viewBox="0 0 258 42"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M48.0493 2.01335L5.6993 24.0134C-2.66166 28.3567 0.426401 41 9.84821 41H248C252.971 41 257 36.9706 257 32V10C257 5.02944 252.971 1 248 1H52.1982C50.754 1 49.3309 1.34757 48.0493 2.01335Z"
                                stroke="#B2B2B3"
                            />
                        </svg>
                        <span>Admin</span>
                    </button>
                </ContainerBtn>
            </Wrapper>
        </React.Fragment>
    );
}

export { Home };
