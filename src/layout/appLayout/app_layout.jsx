import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components";
import * as Styled from "../../styles";
function AppLayout() {
    return (
        <React.Fragment>
            <Styled.App_wrapper className="wrapper">
                <Styled.App_container className="container">
                    <Header/>
                    <Outlet />
                </Styled.App_container>
            </Styled.App_wrapper>
        </React.Fragment>
    );
}

export { AppLayout };
