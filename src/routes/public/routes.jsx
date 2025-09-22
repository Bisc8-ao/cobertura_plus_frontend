import { Route } from "react-router-dom";
import { AppLayout } from "../../layout";
import {
    ForgotPassword,
    Home,
    SignIn,
    SignUp,
    VerifyAccount,
    Subscribe,
    Sandbox,
    SubscriptionConfirmation,
    TestCoverage,
} from "../../pages";

function PublicRoutes() {
    return (
        <>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verifyaccount" element={<VerifyAccount />} />
                <Route path="/subscribe" element={<Subscribe />} />
                <Route path="/test-coverage" element={<TestCoverage />} />
                <Route
                    path="/subscription-confirmation"
                    element={<SubscriptionConfirmation />}
                />
                <Route path="/sandbox" element={<Sandbox />} />
            </Route>
        </>
    );
}

export { PublicRoutes };
