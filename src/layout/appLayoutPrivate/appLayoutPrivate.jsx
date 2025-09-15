import React from "react";
import { Outlet } from "react-router-dom";
import { MiniDrawer } from "../../components";
import { styled } from "@mui/material"

const Container = styled("main")(() => ({
    paddingLeft: "calc(5 * 8px)",
    paddingRight: "calc(5 * 8px)",
}));
function AppLayoutPrivate() {
    return (
        <React.Fragment>
            <div>
                <MiniDrawer>

                    <Container>
                        <Outlet />
                    </Container>

               </MiniDrawer>
            </div>
        </React.Fragment>
    );
}

export { AppLayoutPrivate };
