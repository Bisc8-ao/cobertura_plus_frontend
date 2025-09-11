import React from "react";
import * as Styled from "../../../styles";
import { Typography } from "@mui/material";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { vectorImages } from "../../../assets/svgs";

function SubscriptionConfirmation() {
    const navigate = useNavigate();

    function handleClick() {
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
                            Confirme a sua caixa de e-mail
                        </Typography>
                        <span>
                            Verifique a sua caixa de e-mail. Lá encontrará os
                            próximos passos para concluir a subscrição do seu
                            serviço de internet.
                        </span>
                    </Styled.Subs_ContainerContent>

                    <Button
                        variant="contained"
                        text="Voltar"
                        type="submit"
                        onClick={handleClick}
                    />

                </Styled.Subs_Container>
            </Styled.Subs_Wrapper>
        </React.Fragment>
    );
}

export { SubscriptionConfirmation };
