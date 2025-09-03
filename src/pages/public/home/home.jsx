import React, { useState } from "react";

import { Button } from "../../../components";
import { vectorImages} from "../../../assets";
import * as Styled from "../../../styles";
import { useNavigate } from "react-router-dom";
import { UseWidthScreen } from "../../../hooks";


function Home() {
    const { isPageHome } = UseWidthScreen();
    const navigate = useNavigate();
    const [location, setLocation] = useState({});
    const [error, setError] = useState();

    function handleClick() {
        navigate("/signin");
    }

    function handleClicks() {
        navigate("/sandbox");
    }
    function handleLocation() {
        if (!navigator.geolocation) {
            setError("Geolocalição não suportada");
        }


        navigator.geolocation.getCurrentPosition(
            (position) => {

                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setError(null);
                alert(
                    `Tem cobertura, incrver-se ao serviço`
                );
                navigate("/subscribe");
            },
            (err) => {
                setError("Errro a obter a localização:" + err.message);
            }
        );
    }

    return (
        <React.Fragment>
            <Styled.Ho_Wrapper>
                <Styled.Shape>
                    <img
                        src={vectorImages.shapes.shap_1}
                        alt="shape decorativo"
                        style={{ width: "100%", height: "100%" }}
                    />
                </Styled.Shape>
                <Styled.Ho_Container>
                    <Styled.Ho_ContainerContent>
                        <span>
                            Teste a disponibilidade
                            <br /> do nosso serviço
                            <br /> na sua região.
                        </span>

                        <Styled.Ho_Box>
                            <Button
                                text="Na minha localização"
                                variant="contained"
                                onClick={handleLocation}
                            />
                            <Button
                                text="Outro lugar"
                                variant="outlined"
                                isPageHome={isPageHome}
                                onClick={handleClicks}
                            />
                        </Styled.Ho_Box>
                    </Styled.Ho_ContainerContent>
                </Styled.Ho_Container>

                <Styled.Shap2>
                    <img
                        src={vectorImages.shapes.shap_1}
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
        </React.Fragment>
    );
}

export { Home };
