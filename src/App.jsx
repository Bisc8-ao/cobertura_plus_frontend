import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import { globalStyle, Theme } from "./styles";
import { PublicRoutes } from "./routes";

function App() {
    return (
        <React.Fragment>
            <ThemeProvider theme={Theme}>
                <GlobalStyles styles={globalStyle} />
                <PublicRoutes />
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
