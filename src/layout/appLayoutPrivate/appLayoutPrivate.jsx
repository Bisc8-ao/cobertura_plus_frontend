import React from "react";
import { Outlet } from "react-router-dom";
import { MiniDrawer } from "../../components";
import { styled } from "@mui/material"

const Container = styled("div")(() => ({
    paddingLeft: "calc(5 * 8px)",
    paddingRight: "calc(5 * 8px)",
    "@media (max-width:430px)": {
        paddingLeft: "1rem",
        paddingRight: "1rem",
    },
    "@media (max-width:320px)": {
        paddingLeft: "0rem",
        paddingRight: "0rem",
    },
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
