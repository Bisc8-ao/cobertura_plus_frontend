import React from "react";
import { useWidthScreen } from "../../hooks";
import { Outlet} from "react-router-dom";
import { Header, Header2 } from "../../components";
import * as Styled from "../../styles";

function AppLayout() {

    const {  showHeader2 } = useWidthScreen();




    return (
        <React.Fragment>
            <Styled.App_wrapper >
                <Styled.App_container >
                    {showHeader2 ? <Header2 /> : <Header />}
                    <Outlet />
                </Styled.App_container>
            </Styled.App_wrapper>
        </React.Fragment>
    );
}

export { AppLayout };
