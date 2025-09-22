import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import { globalStyle, Theme } from "./styles";
import { AppRoutes } from "./routes";

import { UseThemeMode } from "./hooks";

function App() {
    const { mode } = UseThemeMode();
    return (
        <React.Fragment>

                <ThemeProvider theme={Theme(mode)}>
                    <GlobalStyles styles={globalStyle} />
                    <AppRoutes />
                </ThemeProvider>

        </React.Fragment>
    );
}

export default App;
