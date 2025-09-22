import React from "react";
import PropTypes from "prop-types";
import { UserProvider } from "../userContext";
import { LangProvider } from "../langContext";
import { LocationProvider } from "../location";
import { ThemeModeProvider } from "../themeModeContext";
function AppAprovider({ children }) {
    return (
        <React.Fragment>
            <ThemeModeProvider>
                <UserProvider>
                    <LangProvider>
                        <LocationProvider>{children}</LocationProvider>
                    </LangProvider>
                </UserProvider>
            </ThemeModeProvider>
        </React.Fragment>
    );
}

AppAprovider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AppAprovider };
