import React from "react";
import { Outlet } from "react-router-dom";
import { MiniDrawer } from "../../components";
function AppLayoutPrivate() {
    return (
        <React.Fragment>
            <section>
                <MiniDrawer>

                    <Outlet />
               
               </MiniDrawer>
            </section>
        </React.Fragment>
    );
}

export { AppLayoutPrivate };
