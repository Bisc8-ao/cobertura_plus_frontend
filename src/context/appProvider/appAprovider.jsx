import React from "react";
import { UserProvider } from "../userContext";
import { LangProvider } from "../langContext";
import { LocationProvider } from "../location";
function AppAprovider({ children }) {
    return (
        <React.Fragment>
            <UserProvider>
                <LangProvider>
                    <LocationProvider>{children}</LocationProvider>
                </LangProvider>
            </UserProvider>
        </React.Fragment>
    );
}

export { AppAprovider };
