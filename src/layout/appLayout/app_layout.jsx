import React from "react";
import { UseWidthScreen } from "../../hooks";
import { Outlet} from "react-router-dom";
import { Header, Header2 } from "../../components";
import * as Styled from "../../styles";

function AppLayout() {

    const {  showHeader2 } = UseWidthScreen();




    return (
        <React.Fragment>
            <Styled.App_wrapper className="wrapper">
                <Styled.App_container className="container">
                    {showHeader2 ? <Header2 /> : <Header />}
                    <Outlet />
                </Styled.App_container>
            </Styled.App_wrapper>
        </React.Fragment>
    );
}

export { AppLayout };
