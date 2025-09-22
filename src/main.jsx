import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AppAprovider } from "./context";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppAprovider>
            <App />
        </AppAprovider>
    </StrictMode>
);
