import React from "react";
import * as Styled from "../../../styles";
import { Typography } from "@mui/material";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { vectorImages } from "../../../assets/svgs";
import { UseLangContext, UseLocation } from "../../../hooks";

function SubscriptionConfirmation() {
    const navigate = useNavigate();
    const { translations } = UseLangContext();
    

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
                            {translations.pages.subscriptionConfirmation.title}
                        </Typography>
                        <span>
                            {
                                translations.pages.subscriptionConfirmation
                                    .description
                            }
                        </span>
                    </Styled.Subs_ContainerContent>

                    <Button
                        variant="contained"
                        text={
                            translations.pages.subscriptionConfirmation
                                .btnText.back
                        }
                        type="submit"
                        onClick={handleClick}
                    />
                </Styled.Subs_Container>
            </Styled.Subs_Wrapper>
        </React.Fragment>
    );
}

export { SubscriptionConfirmation };
