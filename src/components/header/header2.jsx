import React from "react";
import { useLangContext, UseThemeMode, useWidthScreen } from "../../hooks";
import { vectorImages } from "../../assets";
import SettingsIcon from "@mui/icons-material/Settings";
import * as Styled from "../../styles";
import { Link } from "react-router-dom";
import { AnchorTemporaryDrawer } from "../anchorTemporaryDrawer";
import { DrawerSettings } from "../drawerSettings";

function Header2() {
    const { translations } = useLangContext();
    const { widthScreen } = useWidthScreen()
    const { mode } = UseThemeMode();


    return (
        <React.Fragment>
            <Styled.He_Wrapper>
                <Styled.He_Container>
                    <Styled.He_Content>
                        <div>
                            <AnchorTemporaryDrawer
                                anchor="right"
                                icon={
                                    <Styled.RouterLink>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: translations.components
                                                    .header.help,
                                            }}
                                        />

                                        <SettingsIcon
                                            sx={{ color: "#637381" }}
                                        />
                                    </Styled.RouterLink>
                                }
                                width="420px"
                            >
                                <DrawerSettings />
                            </AnchorTemporaryDrawer>
                        </div>

                        <Link to="/">
                            <Styled.He_ImgContainer>
                                <img
                                    src={
                                        widthScreen && mode === "light"
                                            ? vectorImages.logos.brand
                                                  .brand_logo_2
                                            : vectorImages.logos.brand
                                                  .brand_logo_1
                                    }
                                    alt="tvcabo"
                                />
                            </Styled.He_ImgContainer>
                        </Link>
                    </Styled.He_Content>
                </Styled.He_Container>
            </Styled.He_Wrapper>
        </React.Fragment>
    );
}

export { Header2 };
