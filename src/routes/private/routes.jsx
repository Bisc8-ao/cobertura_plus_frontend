import { Route } from "react-router-dom";
import {
    Dashboard,
    UpdatePassword,
    Statistics,
    Map,
    UserList,
    Profile,
    HeatMap,
} from "../../pages";
import { AppLayoutPrivate, AppLayout } from "../../layout";
import { ProtectedRoute } from "../../guards";

function PrivateRoutes() {
    return (
        <>
            <Route element={<ProtectedRoute />}>
                <Route element={<AppLayoutPrivate />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route
                        path="/dashboard/statistics"
                        element={<Statistics />}
                    />
                    <Route path="/dashboard/map" element={<Map />} />
                    <Route path="/dashboard/hatmap" element={<HeatMap />} />
                    <Route
                        path="/dashboard/user/profile"
                        element={<Profile />}
                    />
                    <Route path="/dashboard/user/list" element={<UserList />} />
                </Route>
                <Route element={<AppLayout />}>
                    <Route
                        path="/dashboard/auth/updatePassword"
                        element={<UpdatePassword />}
                    />
                </Route>
            </Route>
        </>
    );
}

export { PrivateRoutes };
