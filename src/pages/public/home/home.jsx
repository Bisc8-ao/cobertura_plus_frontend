import React from "react";

import { Button, Loader } from "../../../components";
import { vectorImages, lotties } from "../../../assets";
import * as Styled from "../../../styles";
import { Link, useNavigate } from "react-router-dom";
import { useLangContext, UseLocation, UseThemeMode } from "../../../hooks";
import { UseTimeoutEffect } from "../../../hooks";

function Home() {
    const navigate = useNavigate();
    const { showAvalibe, setShowAvalibe, showVerific } = UseTimeoutEffect();
    const {mode} = UseThemeMode()
    const { handleLocation, location } = UseLocation();

    const { translations } = useLangContext();

    function handleClick() {
        navigate("/signin");
    }

    function handleClickLocation() {
        handleLocation(() => {
            setShowAvalibe(true);
        });
    }
    return (
        <React.Fragment>
            {showAvalibe ? (
                <Loader Animation={lotties.FindAnimation} />
            ) : showVerific ? (
                <Loader
                    Animation={
                        location.corvaged
                            ? lotties.CheckAnimation
                            : lotties.Erroranimation
                    }
                />
            ) : (
                <Styled.Ho_Wrapper>
                    <Styled.Shape>
                        <img
                            src={
                                mode === "dark"
                                    ? vectorImages.shapes.shap_2
                                    : vectorImages.shapes.shap_1
                            }
                            alt="shape decorativo"
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Styled.Shape>
                    <Styled.Ho_Container>
                        <Styled.Ho_ContainerContent>
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: translations.pages.home.mainText,
                                }}
                            />

                            <Styled.Ho_Box>
                                <Button
                                    text={translations.pages.home.btn.IML}
                                    variant="contained"
                                    onClick={handleClickLocation}
                                />
                                <Link to="/sandbox">
                                    {translations.pages.home.btn.OTL}
                                </Link>
                            </Styled.Ho_Box>
                        </Styled.Ho_ContainerContent>
                    </Styled.Ho_Container>

                    <Styled.Shap2>
                        <img
                            src={
                                mode === "dark"
                                    ? vectorImages.shapes.shap_2
                                    : vectorImages.shapes.shap_1
                            }
                            alt="shape decorativo"
                            style={{ width: "100%", height: "100%" }}
                        />
                    </Styled.Shap2>
                    <Styled.Ho_ContainerBtn>
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
                    </Styled.Ho_ContainerBtn>
                </Styled.Ho_Wrapper>
            )}
        </React.Fragment>
    );
}

export { Home };
