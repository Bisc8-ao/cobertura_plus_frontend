import React from "react";
import * as Styled from "../../../styles";
import { Typography, Box } from "@mui/material";
import { Button } from "../../../components";
import { useNavigate, Navigate } from "react-router-dom";
import { vectorImages } from "../../../assets/svgs";
import { useLangContext, useLocation } from "../../../hooks";

function TestCoverage() {
    const navigate = useNavigate();
    const { location } = useLocation();
    const { translations } = useLangContext();

    function HandleNavigateSubscribe() {
        navigate("/subscribe");
    }
     function HandleClickNavigate() {
         navigate("/");
     }


     if (Object.keys(location).length === 0) {
         return <Navigate to="/" replace />;
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
                                {location.corvaged
                                    ? translations.pages.testCovarge.title
                                    : translations.pages.testCovarge.title2}
                            </Typography>
                            <span>
                                {translations.pages.testCovarge.description}
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
                                text={
                                    translations.pages.testCovarge.btnText.sub
                                }
                                type="submit"
                                onClick={HandleNavigateSubscribe}
                            />
                            <Button
                                variant="outiline"
                                text={
                                    translations.pages.testCovarge.btnText.rtn
                                }
                                type="submit"
                                onClick={HandleClickNavigate}
                            />
                        </Box>
                    </Styled.Subs_Container>
                </Styled.Subs_Wrapper>
            </React.Fragment>
        );
}

export { TestCoverage };
