import React from "react";
import * as Styled from "../../../styles";
import { Typography, Box } from "@mui/material";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { vectorImages } from "../../../assets/svgs";

function TestCovarge() {
    const navigate = useNavigate();

    function HandleNavigateSubscribe() {
        navigate("/subscribe");
    }
     function HandleClickNavigate() {
         navigate("/");
     }
    
    return (
        <React.Fragment>
            <Styled.Subs_Wrapper>
                <Styled.Subs_Container>
                    <Styled.Subs_ContainerContent>
                        <img src={vectorImages.icons.email} />
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                fontSize: "1.9rem",
                                fontWeight: "800",
                                lineHeight: "2.8rem",
                            }}
                        >
                            Serviço disponível
                        </Typography>
                        <span>
                            Inscreva-se e acompanhe as próximas etapas para ter
                            acesso ao nosso serviço de internet.
                        </span>
                    </Styled.Subs_ContainerContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",

                            gap: "2.4rem",
                        }}
                    >
                        <Button
                            variant="contained"
                            text="Inscrever-se"
                            type="submit"
                            onClick={HandleNavigateSubscribe}
                        />
                        <Button
                            variant="outiline"
                            text="Retornar"
                            type="submit"
                            onClick={HandleClickNavigate}
                        />
                    </Box>
                </Styled.Subs_Container>
            </Styled.Subs_Wrapper>
        </React.Fragment>
    );
}

export { TestCovarge };
