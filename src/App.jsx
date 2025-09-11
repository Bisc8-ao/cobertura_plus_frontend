import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import { globalStyle, Theme } from "./styles";
import { AppRoutes } from "./routes";
import { UserProvider, LangProvider } from "./context";

function App() {
    return (
        <React.Fragment>
            <ThemeProvider theme={Theme}>
                <UserProvider>
                    <LangProvider>
                        <GlobalStyles styles={globalStyle} />
                        <AppRoutes />
                    </LangProvider>
                </UserProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
