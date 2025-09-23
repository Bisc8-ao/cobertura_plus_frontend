import { Route } from "react-router-dom";
import { Dashboard, UpdatePassword, Statistics, Map,User, Profile, HeatMap} from "../../pages";
import { AppLayoutPrivate,AppLayout } from "../../layout";
import { ProtectedRoute } from "../../guards"

function PrivateRoutes() {
    return (
        <>
            <Route element={<AppLayoutPrivate />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/statistics" element={<Statistics />} />
                <Route path="/dashboard/map" element={<Map />} />
                <Route path="/dashboard/user" element={<User />} />
                <Route path="/dashboard/hatmap" element={<HeatMap />} />
                <Route path="/dashboard/profile" element={<Profile />} />
            </Route>
            <Route element={<AppLayout />}>
                <Route path="/updatePassword" element={<UpdatePassword />} />
            </Route>
           {/* <Route element={<ProtectedRoute />}> </Route>*/}
        </>
    );
}

export { PrivateRoutes };
