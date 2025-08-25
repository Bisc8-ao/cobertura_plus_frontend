import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, UpdatePassword } from "../../pages";
function Privateroutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/updatePassword" element={<UpdatePassword />} />
            </Routes>
        </BrowserRouter>
    );
}

export { Privateroutes };
