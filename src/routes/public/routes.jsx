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
                <Route
                    path="/auth/forgotpassword"
                    element={<ForgotPassword />}
                />
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/auth/verifyaccount" element={<VerifyAccount />} />
                <Route path="/coverage/subscribe" element={<Subscribe />} />
                <Route
                    path="coverage/tested-coverage"
                    element={<TestCoverage />}
                />
                <Route
                    path="/coverage/subscription-confirmation"
                    element={<SubscriptionConfirmation />}
                />
                <Route path="/coverage/sandbox" element={<Sandbox />} />
            </Route>
        </>
    );
}

export { PublicRoutes };
