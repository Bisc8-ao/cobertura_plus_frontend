import React from "react";
import { UseWidthScreen } from "../../hooks";
import { vectorImages } from "../../assets";
import SettingsIcon from "@mui/icons-material/Settings";
import * as Styled from "../../styles";
import { useLocation,Link } from "react-router-dom";

function Header() {
    const { widthScreen, isPageHome } = UseWidthScreen();
    const location = useLocation();

    const isPageVerifyAccount = location.pathname === "/verifyaccount" || location.pathname === "/" || location.pathname=== "/sandbox";

    const logoSrc =
        widthScreen || isPageVerifyAccount
            ? vectorImages.logos.brand.brand_logo_2
            : vectorImages.logos.brand.brand_logo_1;

    return (
        <React.Fragment>
            <Styled.He_Wrapper>
                <Styled.He_Container isPageHome={isPageHome}>
                    <Styled.He_Content>
                        <Link to="/">
                            <Styled.He_ImgContainer>
                                <img src={logoSrc} alt="tvcabo" />
                            </Styled.He_ImgContainer>
                        </Link>
                        <Styled.RouterLink isPageHome={isPageHome}>
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
