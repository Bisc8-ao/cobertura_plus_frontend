import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    ForgotPassword,
    Home,
    SignIn,
    SignUp,
    VerifyAccount,
} from "../../pages";

function PublicRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verifyaccount" element={<VerifyAccount />} />
            </Routes>
        </BrowserRouter>
    );
}

export { PublicRoutes };
