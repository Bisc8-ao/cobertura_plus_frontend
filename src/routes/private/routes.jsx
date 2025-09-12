import { Route } from "react-router-dom";
import { Dashboard, UpdatePassword, Statistics, Map,User} from "../../pages";
import { AppLayoutPrivate } from "../../layout";
import {ProtectedRoute} from "../../guards"
function PrivateRoutes() {
    return (
        <>
            <Route element={<ProtectedRoute />} >
            <Route element={<AppLayoutPrivate />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/map" element={<Map />} />
                <Route path="/user" element={<User />} />
            </Route>
            <Route path="/updatePassword" element={<UpdatePassword />} />
            </Route>
        </>
    );
}

export { PrivateRoutes };
