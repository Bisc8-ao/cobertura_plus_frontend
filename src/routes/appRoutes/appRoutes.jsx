import { BrowserRouter, Routes } from "react-router-dom";
import { PublicRoutes } from "../public";
import { PrivateRoutes } from "../private";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {PublicRoutes()}
                {PrivateRoutes()} 
            </Routes>
        </BrowserRouter>
    );
}

export { AppRoutes };
