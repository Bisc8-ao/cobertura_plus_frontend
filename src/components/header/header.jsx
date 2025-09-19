import React from "react";
import { useLangContext, useWidthScreen } from "../../hooks";
import { vectorImages } from "../../assets";
import SettingsIcon from "@mui/icons-material/Settings";
import * as Styled from "../../styles";
import { useLocation,Link } from "react-router-dom";
import { AnchorTemporaryDrawer } from "../anchorTemporaryDrawer";
import { DrawerSettings } from "../drawerSettings";

function Header() {
    const { langSelected, setLangSelected, translations } = useLangContext();
    const { widthScreen, isPageHome } = useWidthScreen();
    const location = useLocation();


    const isPageVerifyAccount = [
        "/verifyaccount",
        "/",
        "/sandbox",
        "/subscription-confirmation",
        "/test-covarge",
    ].includes(location.pathname);


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

                        <AnchorTemporaryDrawer
                            anchor="right"
                            icon={
                                <Styled.RouterLink isPageHome={isPageHome}>
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: translations.components
                                                .header.help,
                                        }}
                                    />

                                    <SettingsIcon sx={{ color: "#637381" }} />
                                </Styled.RouterLink>
                            }
                            width="420px"
                        >
                            <DrawerSettings />
                        </AnchorTemporaryDrawer>
                    </Styled.He_Content>
                </Styled.He_Container>
            </Styled.He_Wrapper>
        </React.Fragment>
    );
}

export { Header };
