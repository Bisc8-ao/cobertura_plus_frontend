import React from "react";
import { UseWidthScreen } from "../../hooks";
import { vectorImages } from "../../assets";
import SettingsIcon from "@mui/icons-material/Settings";
import * as Styled from "../../styles";
import { useLocation } from "react-router-dom";

function Header() {
    const { widthScreen } = UseWidthScreen();
    const location = useLocation();

    const isPageVerifyAccount = location.pathname === "/verifyaccount" || location.pathname === "/";

    const logoSrc =
        widthScreen || isPageVerifyAccount
            ? vectorImages.logos.brand.brand_logo_2
            : vectorImages.logos.brand.brand_logo_1;

    return (
        <React.Fragment>
            <Styled.He_Wrapper>
                <Styled.He_Container>
                    <Styled.He_Content>
                        <Styled.He_ImgContainer>
                            <img src={logoSrc} alt="tvcabo" />
                        </Styled.He_ImgContainer>
                        <Styled.RouterLink>
                            <span>
                                <b>Precisa de</b> ajuda?
                            </span>
                            <SettingsIcon sx={{ color: "#637381" }} />
                        </Styled.RouterLink>
                    </Styled.He_Content>
                </Styled.He_Container>
            </Styled.He_Wrapper>
        </React.Fragment>
    );
}

export { Header };
