import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import { globalStyle, Theme } from "./styles";
import { AppRoutes } from "./routes";
import { AppAprovider } from "./context";

function App() {
    return (
        <React.Fragment>
            <AppAprovider>
                <ThemeProvider theme={Theme}>
                    <GlobalStyles styles={globalStyle} />
                    <AppRoutes />
                </ThemeProvider>
            </AppAprovider>
        </React.Fragment>
    );
}

export default App;
