import React from "react";
import { images } from "../../../assets";
import { styled, Typography } from "@mui/material";
import * as Styled from "../../../styles";
import { Button } from "../../../components";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { vectorImages } from "../../../assets/svgs";
const Wrapper = styled("div")({
    width: "100%",
    height: "100%",
    backgroundImage: `url(${images.backgrounds.background_1})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});
function VerifyAccount() {
    return (
        <React.Fragment>
            <Wrapper>
                <Styled.ContainerForm
                    borderRadius="1.5rem"
                    padding="4rem"
                    width="30%"
                >
                    <Styled.ContainerFormContent alignment="center">
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
                            Verifique o seu email
                        </Typography>
                        <span>
                            Enviámos um código de confirmação de 6 dígitos por
                            e-mail. Por favor, introduza o código na caixa
                            abaixo para verificar o seu e-mail.
                        </span>
                    </Styled.ContainerFormContent>

                    <Styled.ContainerInputs>
                        <Styled.Input
                            id="outlined-basic"
                            label="Endereço de email"
                            type="email"
                        />

                        <Button
                            variant="contained"
                            text="Validar"
                            type="submit"
                        />
                        <Styled.ContainerFormContent alignment="center">
                            <span>
                                Não recebeu o código? <Link>Reenviar</Link>
                            </span>
                        </Styled.ContainerFormContent>
                        <div data-element="Link_back">
                            <Link to="/forgotpassword">
                                <span>
                                    <ArrowBackIosIcon />
                                </span>{" "}
                                Voltar
                            </Link>
                        </div>
                    </Styled.ContainerInputs>
                </Styled.ContainerForm>
            </Wrapper>
        </React.Fragment>
    );
}

export { VerifyAccount };
