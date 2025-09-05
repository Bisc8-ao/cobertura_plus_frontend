import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import { globalStyle, Theme } from "./styles";
import { AppRoutes } from "./routes";
import { UserProvider } from "./context";

function App() {
    return (
        <React.Fragment>
            <UserProvider>
            <ThemeProvider theme={Theme}>
                <GlobalStyles styles={globalStyle} />
                <AppRoutes />
            </ThemeProvider>
            </UserProvider>
        </React.Fragment>
    );
}

export default App;
