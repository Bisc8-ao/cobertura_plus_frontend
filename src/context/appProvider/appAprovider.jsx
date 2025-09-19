import React from "react";
import PropTypes from "prop-types";
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

AppAprovider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AppAprovider };
