import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "../../layout";
import {
    ForgotPassword,
    Home,
    SignIn,
    SignUp,
    VerifyAccount,
    Subscribe
} from "../../pages";

function PublicRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/forgotpassword"
                        element={<ForgotPassword />}
                    />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/verifyaccount" element={<VerifyAccount />} />
                    <Route path="/subscribe" element={<Subscribe />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export { PublicRoutes };
