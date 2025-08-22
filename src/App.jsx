import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";

import { PublicRoutes } from "./routes";

const Theme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
    },
});
function App() {
    return (
        <ThemeProvider theme={Theme}>
            <PublicRoutes />
        </ThemeProvider>
    );
}

export default App;
